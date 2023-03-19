import { useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setupAPIClient } from "@/services/api";
import { HaircutContext } from "@/contexts/HaircutContext";
import { BarberContext } from "@/contexts/BarberContext";
import { canSSRGuestFast } from "@/utils/canSSRGuestFast";
import { setConfigUserFromEnv } from "@/utils/isClient";
import { BarbersItem, HaircutsItem, HaircutsProps, HandlersFastType, VariablesFastType } from "./Fast.types";
import FastLayout from "./Fast.layout";

export default function FastSchedule({ barbers, user }: HaircutsProps) {

  const { registerNewCutFast } = useContext(HaircutContext)
  const { getTimeAvaliableFast } = useContext(BarberContext)
  const [name, setName] = useState('')
  const [loader, setLoader] = useState(false)
  const [barberSelected, setBarberSelected] = useState<BarbersItem>()
  const [user_id, setUserId] = useState<string>(user?.id)
  const [availableTime, setAvailableTime] = useState<string[]>()
  const [dateSelected, setDateSelected] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [initialAvailableTime, setInitialAvailableTime] = useState<string[]>()
  const [timesUsed, setTimesUsed] = useState<string[]>()
  const [haircutSelected, setHaircutSelected] = useState<HaircutsItem>()
  const [timeToUsed, setTimeToUsed] = useState<string[]>()
  const [showSpinner, setShowSpinner] = useState(false);
  const [openResume, setOpenResume] = useState(false);
  const [dataResume, setDataResume] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const timeUsed = Number(haircutSelected?.time)

  async function handleRegister() {
    if (!name) {
      toast.warning("Preencha todos os campos!")
      return
    }
    setLoader(true)
    await registerNewCutFast({
      customer: name,
      haircut_id: haircutSelected?.id,
      barber_id: barberSelected?.id,
      time: timeToUsed[0],
      date: dateSelected,
      user_id,
      time_occuped: timeToUsed
    })
    setLoader(false)
    setName("")
    setTimeToUsed(null)
    setDateSelected(null)
    setAvailableTime(null)
    setShowSpinner(false)
    setBarberSelected(null)
    setHaircutSelected(null)
  }

  async function handleChangeSelectBarber(id: string) {
    const barber = barbers?.find(item => item.id === id)
    setBarberSelected(barber)
  }

  function handleClickItem() {
    onOpen()
  }

  function handleChangeSelectHaircut(id: string) {
    const haircutItem = barberSelected?.haircuts?.find(item => item.id === id)
    setHaircutSelected(haircutItem)
  }

  useEffect(() => {
    if (barberSelected && dateSelected) {
      getTimeAvaliableFast({ barber_id: barberSelected?.id, date: dateSelected }).then((value) => {
        const result = barberSelected?.available_at.filter(item => !value.includes(item));
        setAvailableTime(result)
        setTimesUsed(value)
        setInitialAvailableTime(barberSelected?.available_at)
      });
    }

    if (openResume) {
      setDataResume({
        customer: name,
        haircut: haircutSelected,
        barber: barberSelected,
        time: timeToUsed[0],
        date: dateSelected,
      })
    }
  }, [barberSelected, dateSelected, openResume])

  const variables: VariablesFastType = {
    availableTime,
    barbers,
    barberSelected,
    dataResume,
    date,
    dateSelected,
    haircutSelected,
    initialAvailableTime,
    isOpen,
    loader,
    name,
    openResume,
    showSpinner,
    timesUsed,
    timeToUsed,
    timeUsed,
    user_id,
  }

  const handlers: HandlersFastType = {
    setName,
    setLoader,
    setBarberSelected,
    setUserId,
    setAvailableTime,
    setInitialAvailableTime,
    setDateSelected,
    setDate,
    setTimesUsed,
    setTimeToUsed,
    setHaircutSelected,
    setShowSpinner,
    setDataResume,
    setOpenResume,
    handleRegister,
    handleChangeSelectHaircut,
    handleChangeSelectBarber,
    handleClickItem,
    onOpen,
    onClose,
  }

  return (
    <>
      <FastLayout
        handlers={handlers}
        variables={variables}
      />
    </>
  )
}

export const getServerSideProps = canSSRGuestFast(async (ctx) => {
  try {
    const user_name = await setConfigUserFromEnv()

    const apiClient = setupAPIClient(ctx)

    const user = await apiClient.get('/user/check',
      {
        params: {
          name: user_name
        }
      })

    const barbers = await apiClient.get('/barbers/fast',
      {
        params: {
          status: true,
          user_id: user?.data?.id,
        }
      })

    return {
      props: {
        barbers: barbers.data,
        user: user.data
      }
    }
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
})
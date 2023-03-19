import { useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { HaircutContext } from "@/contexts/HaircutContext";
import { toast } from "react-toastify";
import { BarberContext } from "@/contexts/BarberContext";
import NewLayout from "./New.layout";
import { BarbersItem, HaircutsItem, HaircutsProps, HandlersNewType, VariablesNewType } from "./New.types";

export default function New({ haircuts, barbers }: HaircutsProps) {

  const { registerNewCut } = useContext(HaircutContext)
  const { getTimeAvaliable } = useContext(BarberContext)

  const [customer, setCustomer] = useState("")
  const [loader, setLoader] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // Selected
  const [haircutSelected, setHaircutSelected] = useState<HaircutsItem>()
  const [barberSelected, setBarberSelected] = useState<BarbersItem>()
  const [dateSelected, setDateSelected] = useState<string>();
  // 
  const [availableTime, setAvailableTime] = useState<string[]>()
  const [initialAvailableTime, setInitialAvailableTime] = useState<string[]>()
  const [timesUsed, setTimesUsed] = useState<string[]>()
  const [timeToUsed, setTimeToUsed] = useState<string[]>()
  const [date, setDate] = useState<Date>();
  const [showSpinner, setShowSpinner] = useState(false);
  const [, setOpenResume] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const timeUsed = Number(haircutSelected?.time)

  async function handleRegister() {
    if (!customer) {
      toast.warning("Preencha todos os campos!")
      return
    }

    setLoader(true)
    await registerNewCut({ customer, haircut_id: haircutSelected?.id, barber_id: barberSelected?.id, time: timeToUsed[0], date: dateSelected, time_occuped: timeToUsed })
    setLoader(false)

  }

  function handleBackButton() {
    setIsLoading(true)
  }

  function handleChangeSelectHaircut(id: string) {
    const haircutItem = haircuts?.find(item => item.id === id)
    setHaircutSelected(haircutItem)
  }

  async function handleChangeSelectBarber(id: string) {
    const barber = barbers?.find(item => item.id === id)
    setBarberSelected(barber)
  }

  function handleClickItem() {
    onOpen()
  }

  useEffect(() => {

    if (barberSelected && dateSelected) {
      getTimeAvaliable({ barber_id: barberSelected?.id, date: dateSelected }).then((value) => {
        const result = barberSelected?.available_at.filter(item => !value.includes(item));
        setAvailableTime(result)
        setTimesUsed(value)
        setInitialAvailableTime(barberSelected?.available_at)
      });
    }

  }, [barberSelected, dateSelected])

  const variables = {
    availableTime,
    barbers,
    barberSelected,
    customer,
    date,
    dateSelected,
    haircuts,
    timesUsed,
    haircutSelected,
    initialAvailableTime,
    isLoading,
    loader,
    showSpinner,
    timeToUsed,
    timeUsed,
    isOpen
  } as VariablesNewType

  const handlers = {
    handleBackButton,
    handleChangeSelectBarber,
    handleChangeSelectHaircut,
    handleClickItem,
    handleRegister,
    setAvailableTime,
    setBarberSelected,
    setCustomer,
    setDate,
    setDateSelected,
    setHaircutSelected,
    setInitialAvailableTime,
    setIsLoading,
    setLoader,
    setOpenResume,
    setShowSpinner,
    setTimesUsed,
    setTimeToUsed,
    onOpen,
    onClose,
  } as HandlersNewType

  return (
    <>
      <NewLayout
        handlers={handlers}
        variables={variables}
      />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/haircuts',
      {
        params: {
          status: true
        }
      })

    if (response.data === null) {
      toast.warning("Nenhum corte de cabelo cadastrado!")
    }

    const barbers = await apiClient.get('/barbers',
      {
        params: {
          status: true
        }
      })

    return {
      props: {
        haircuts: response.data,
        barbers: barbers.data
      }

    }
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/schedule',
        permanent: false
      }
    }
  }
})


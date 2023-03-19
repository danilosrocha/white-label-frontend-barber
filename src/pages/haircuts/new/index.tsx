import { useContext, useState } from "react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { HaircutContext } from "@/contexts/HaircutContext";
import { toast } from "react-toastify";
import { validatedValueHaircut } from "@/utils/validatedValueHaircut";
import { parseOneTimeString } from "@/utils/validatedTime";
import { BarbersItem, HandlersNewHaircutType, NewHaircutProps, VariablesNewHaircutType } from "./NewHaircut.types";
import NewHaircutLayout from "./NewHaircut.layout";

export default function NewHaircut({ barbers }: NewHaircutProps) {
  const { registerHaircut } = useContext(HaircutContext)
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [time, setTime] = useState("")
  const [loader, setLoader] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [barberSelected, setBarberSelected] = useState<BarbersItem>()


  async function handleRegisterHaircut() {
    if (!name || !price) {
      toast.warning("Preencha todos os campos!")
      return
    }

    const newPrice = (validatedValueHaircut(price))
    const newTime = (parseOneTimeString(time))

    setLoader(true)
    await registerHaircut({ name, price: newPrice, time: newTime, barber_id: barberSelected?.id })
    setLoader(false)
  }

  async function handleChangeSelectBarber(id: string) {
    const barber = barbers?.find(item => item.id === id)
    setBarberSelected(barber)
  }

  function handleBackButton() {
    setIsLoading(true)
  }

  const variables: VariablesNewHaircutType = {
    name,
    price,
    time,
    loader,
    isLoading,
    barberSelected,
    barbers,
  }

  const handlers: HandlersNewHaircutType = {
    setName,
    setPrice,
    setTime,
    setLoader,
    setIsLoading,
    setBarberSelected,
    handleRegisterHaircut,
    handleChangeSelectBarber,
    handleBackButton,
  }

  return (
    <>
      <NewHaircutLayout
        handlers={handlers}
        variables={variables}
      />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/check')
    const count = await apiClient.get('/haircuts/count')

    const barbers = await apiClient.get('/barbers',
      {
        params: {
          status: true
        }
      })

    return {
      props: {
        subscriptions: response.data?.subscriptions?.status === 'active' ? true : false,
        count: count.data,
        barbers: barbers.data
      }
    }

  } catch (error) {
    return {
      redirect: {
        destination: '/schedule',
        permanent: false
      }
    }
  }
})


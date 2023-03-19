import { useContext, useState } from "react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { toast } from "react-toastify";
import { BarberContext } from "@/contexts/BarberContext";
import { parseTimeString } from "@/utils/validatedTime";
import NewBarberLayout from "./NewBarber.layout";
import { HandlersNewBarberType, VariablesNewBarberType } from "./NewBarber.types";

export default function NewBarber() {
  const { registerBarber } = useContext(BarberContext)
  const [name, setName] = useState("")
  const [startWork, setStartWork] = useState("07:00")
  const [endWork, setEndWork] = useState("20:00")
  const [workTime, setWorkTime] = useState("10")
  const [loader, setLoader] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleRegisterBarber() {
    if (!name) {
      toast.warning("Preencha todos os campos!")
      return
    }
    setLoader(true)
    const response = await handleValidatedTime()
    await registerBarber({ barber_name: name, available_at: response })
    setLoader(false)
  }

  function handleBackButton() {
    setIsLoading(true)
  }

  async function handleValidatedTime() {
    return parseTimeString(startWork, endWork, Number(workTime))
  }

  const variables: VariablesNewBarberType = {
    name,
    startWork,
    endWork,
    workTime,
    loader,
    isLoading,
  }

  const handlers: HandlersNewBarberType = {
    setName,
    setStartWork,
    setEndWork,
    setWorkTime,
    setLoader,
    setIsLoading,
    handleRegisterBarber,
    handleValidatedTime,
    handleBackButton,
  }

  return (
    <>
      <NewBarberLayout
        handlers={handlers}
        variables={variables}
      />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }

})


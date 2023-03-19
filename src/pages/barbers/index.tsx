import { canSSRAuth } from "@/utils/canSSRAuth";
import { useState } from "react";
import { setupAPIClient } from "@/services/api";
import { BarberProps, BarbersProps, HandlersBarberType, VariablesBarberType } from "./Barbers.types";
import BarberLayout from "./Barbers.layout";

export default function Barbers({ barbers }: BarbersProps) {
  const [barbersList, setBarbersList] = useState<BarberProps[]>(barbers || [])
  const [loader, setLoader] = useState(false)
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [disableHaircut, setDisableHaircut] = useState("enabled")

  function handleRegisterCut() {
    setLoader(true)
  }

  function handleClickItem(id: string) {
    setLoadingItemId(id);
  }

  const variables: VariablesBarberType = {
    barbersList,
    loader,
    loadingItemId,
    disableHaircut,
  }

  const handlers: HandlersBarberType = {
    setBarbersList,
    setLoader,
    setLoadingItemId,
    setDisableHaircut,
    handleRegisterCut,
    handleClickItem,
  }

  return (
    <>
      <BarberLayout
        handlers={handlers}
        variables={variables}
      />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/barbers',
      {
        params: {
          status: true
        }
      })

    return {
      props: {
        barbers: response.data
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








import { canSSRAuth } from "@/utils/canSSRAuth";
import React, { useState } from "react";
import { setupAPIClient } from "@/services/api";
import { HandlersHaircutType, VariablesHaircutType } from "./Haircut.types";
import HaircutLayout from "./Haircut.layout";

interface HaircutsBarber {
  haircuts: BarberHaircuts[]
}
interface BarberHaircuts {
  barber_name: string
  id: string
  haircuts: Haircut[]
}
interface Haircut {
  id: string
  name: string
  price: number
  status: boolean
  time: string
  user_id: string
  barber_id: string
}

export default function Haircuts({ haircuts }: HaircutsBarber) {
  const [loader, setLoader] = useState(false)
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [showHaircuts, setShowHaircuts] = useState({});

  function handleRegisterCut() {
    setLoader(true)
  }

  function handleClickItem(haircutId: string) {
    setLoadingItemId(haircutId);
  }

  const handleShowHaircuts = (barberName: string) => {
    setShowHaircuts({
      ...showHaircuts,
      [barberName]: !showHaircuts[barberName],
    });

  };

  const variables: VariablesHaircutType = {
    loader,
    loadingItemId,
    showHaircuts,
    haircuts,
  }

  const handlers: HandlersHaircutType = {
    setLoader,
    setLoadingItemId,
    setShowHaircuts,
    handleRegisterCut,
    handleClickItem,
    handleShowHaircuts,
  }

  return (
    <>
      <HaircutLayout
        handlers={handlers}
        variables={variables}
      />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try {

    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/haircuts/barber',
      {
        params: {
          status: true
        }
      })

    return {
      props: {
        haircuts: response.data
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








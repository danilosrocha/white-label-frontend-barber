import { canSSRAuth } from "@/utils/canSSRAuth";
import React, { useContext, useState } from "react";
import { setupAPIClient } from "@/services/api";
import { HaircutContext } from "@/contexts/HaircutContext";
import ScheduleLayout from "./Schedule.layout";
import { HandlersScheduleType, ScheduleItem, ScheduleProps, VariablesScheduleType } from "./Schedule.types";
import { useDisclosure } from "@chakra-ui/react";

export default function Schedule({ schedule, days }: ScheduleProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { finishCut } = useContext(HaircutContext)
  const [list, setList] = useState(schedule)
  const [service, setService] = useState<ScheduleItem>()
  const [loader, setLoader] = useState(false)
  const [loadingFinish, setLoadingFinish] = useState(false)
  const [loadingCancel, setLoadingCancel] = useState(false)

  function handleRegisterCut() {
    setLoader(true)
  }

  function handleClickItem(item: ScheduleItem) {
    setService(item)
    onOpen()
  }

  async function handleFinish(id: string) {
    setLoadingFinish(true)
    await finishCut({ id, status: "finish" })

    const filterItem = list?.filter(item => {
      return (item?.id !== id)
    })
    setList(filterItem)
    onClose()
    setLoadingFinish(false)
  }

  async function handleCancelSchedule(id: string) {
    setLoadingCancel(true)
    await finishCut({ id, status: "cancel" })

    const filterItem = list?.filter(item => {
      return (item?.id !== id)
    })
    setList(filterItem)
    onClose()
    setLoadingCancel(false)
  }

  const variables = {
    list,
    loader,
    loadingCancel,
    loadingFinish,
    service,
    days,
    isOpen,
  } as VariablesScheduleType

  const handlers = {
    setList,
    setService,
    setLoadingFinish,
    setLoader,
    setLoadingCancel,
    handleRegisterCut,
    handleClickItem,
    handleCancelSchedule,
    handleFinish,
    onOpen,
    onClose
  } as HandlersScheduleType

  return (
    <>
      <ScheduleLayout
        handlers={handlers}
        variables={variables}
      />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/schedules')
    const days = await apiClient.get('/schedule/days')

    return {
      props: {
        schedule: response.data,
        days: days.data
      }

    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        schedule: [],
        days: []
      }
    }

  }
})








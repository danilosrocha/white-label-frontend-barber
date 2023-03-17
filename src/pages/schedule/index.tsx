import { Button, Flex, Heading, Spinner, useDisclosure, Switch, Text, useMediaQuery, Link as ChackLink } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import Head from "next/head";
import Link from "next/link";
import { IoMdPerson } from 'react-icons/io'
import { canSSRAuth } from "@/utils/canSSRAuth";
import React, { useContext, useState } from "react";
import { setupAPIClient } from "@/services/api";
import { HaircutContext } from "@/contexts/HaircutContext";
import { ModalInfo } from "@/components/modal";

export interface ScheduleItem {
  id: string
  customer: string
  time: string
  date: string
  haircut: {
    id: string
    name: string
    price: number | string
    status: boolean
    user_id: string
  }
  barber: {
    barber_name: string
  }
}

interface ScheduleProps {
  schedule: ScheduleItem[]
  days: string[]
}

export default function Schedule({ schedule, days }: ScheduleProps) {
  const { finishCut } = useContext(HaircutContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [list, setList] = useState(schedule)
  const [service, setService] = useState<ScheduleItem>()
  const [loader, setLoader] = useState(false)
  const [loadingFinish, setLoadingFinish] = useState(false)
  const [loadingCancel, setLoadingCancel] = useState(false)
  const [isMobile] = useMediaQuery("(max-width: 800px)")

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

  async function handleCancelSchedule(id: string,) {
    setLoadingCancel(true)
    await finishCut({ id, status: "cancel" })

    const filterItem = list?.filter(item => {
      return (item?.id !== id)
    })
    setList(filterItem)
    onClose()
    setLoadingCancel(false)
  }

  return (
    <>
      <Head>
        <title>Modelos de cortes - Rocha's Client Barber</title>
      </Head>
      <Sidebar>
        <Flex background="barber.900" minH="100vh" alignItems="center" justifyContent="flex-start" direction="column">

          <Flex pt={8} pb={8} maxW="1200px" w="100%" direction="column">

            <Flex w="100%" direction={isMobile ? "column" : "row"} alignItems={isMobile ? "flex-start" : "center"} justifyContent="space-between" mt={6} mb={4} >

              <Flex mb={isMobile ? "10px" : "0"} >
                <Heading fontSize="3xl" mr={4} color="orange.900">Agenda</Heading>

                <Link href="/new" onClick={handleRegisterCut}>
                  <Button color="white" bg="barber.400" _hover={{ bg: "gray.900" }} isLoading={loader}>
                    Registrar
                  </Button>
                </Link>

              </Flex>

            </Flex>

            {days && days.map(date => {
              return (
                <React.Fragment key={date}>
                  <Heading fontSize="xl" mb={2} color="white" ml={2} fontWeight="bold">Dia: {date}</Heading>
                  {list?.map(item => {
                    if (item.date === date) {
                      return (
                        <ChackLink key={item?.id} onClick={() => handleClickItem(item)} >
                          <Flex cursor="pointer" w="100%" p={4} bg="barber.400" direction={isMobile ? "column" : "row"} alignItems={isMobile ? "flex-start" : "center"} rounded={4} mb={4} justifyContent="space-between" key={item?.id}>

                            <Flex direction="row" align="center" mb={isMobile ? "10px" : "0"} key={`${item?.id}-1`}>
                              <IoMdPerson color="#fba931" size={28} />
                              <Text color="white" fontWeight="bold" ml={4} noOfLines={2}>{item?.customer} - </Text>
                              <Text color="white" fontWeight="bold" ml={1}>{(item?.time)}h</Text>
                            </Flex>
                            <Flex alignItems={isMobile ? "flex-start" : "center"} justifyContent="space-between" w="55%" direction={isMobile ? "column" : "row"} key={`${item?.id}-2`}>
                              <Text color="white" justifySelf="flex-end" fontWeight="bold">{item?.haircut?.name}</Text>
                              <Text color="white" fontWeight="bold">R$ {Number(item?.haircut?.price).toFixed(2)}</Text>
                            </Flex>

                          </Flex>
                        </ChackLink>
                      );
                    }
                    return null;
                  })}
                </React.Fragment>
              )
            })}

          </Flex>

        </Flex>
      </Sidebar >

      <ModalInfo
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={service}
        finishService={() => handleFinish(service?.id)}
        loadingFinish={loadingFinish}
        loadingCancel={loadingCancel}
        cancelService={() => handleCancelSchedule(service?.id)}
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








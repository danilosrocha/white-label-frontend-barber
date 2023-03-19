import React from "react";
import { Button, Flex, Heading, Text, Link as ChackLink, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import Head from "next/head";
import Link from "next/link";
import { IoMdPerson } from 'react-icons/io'
import { ModalInfo } from "@/components/modal";
import { LayoutScheduleProps } from "./Schedule.types";
import scheduleText from "./Schedule.language";

export default function ScheduleLayout({handlers, variables}: LayoutScheduleProps) {
  
  const [isMobile] = useMediaQuery("(max-width: 800px)")

  return (
    <>
      <Head>
        <title>{scheduleText?.title}</title>
      </Head>
      <Sidebar>
        <Flex background="barber.900" minH="100vh" alignItems="center" justifyContent="flex-start" direction="column">

          <Flex pt={8} pb={8} maxW="1200px" w="100%" direction="column">

            <Flex w="100%" direction={isMobile ? "column" : "row"} alignItems={isMobile ? "flex-start" : "center"} justifyContent="space-between" mt={6} mb={4} >

              <Flex mb={isMobile ? "10px" : "0"} >
                <Heading fontSize="3xl" mr={4} color="orange.900">{scheduleText?.schedule}</Heading>

                <Link href="/new" onClick={handlers?.handleRegisterCut}>
                  <Button color="white" bg="barber.400" _hover={{ bg: "gray.900" }} isLoading={variables?.loader}>
                    {scheduleText?.register}
                  </Button>
                </Link>

              </Flex>

            </Flex>

            {variables?.days && variables?.days.map(date => {
              return (
                <React.Fragment key={date}>
                  <Heading fontSize="xl" mb={2} color="white" ml={2} fontWeight="bold">Dia: {date}</Heading>
                  {variables?.list?.map(item => {
                    if (item.date === date) {
                      return (
                        <ChackLink key={item?.id} onClick={() => handlers?.handleClickItem(item)} >
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
        isOpen={variables?.isOpen}
        onOpen={handlers?.onOpen}
        onClose={handlers?.onClose}
        data={variables?.service}
        finishService={() => handlers?.handleFinish(variables?.service?.id)}
        loadingFinish={variables?.loadingFinish}
        loadingCancel={variables?.loadingCancel}
        cancelService={() => handlers?.handleCancelSchedule(variables?.service?.id)}
      />
    </>
  )
}

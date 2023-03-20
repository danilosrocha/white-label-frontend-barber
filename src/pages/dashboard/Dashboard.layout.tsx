import {
  Box,
  Heading,
  Text,
  Flex,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react";
import Head from "next/head";
import { Sidebar } from "@/components/sidebar";
import { LayoutDashboardProps } from "./Dashboard.types";
import dashboardText from "./Dashboard.language";
import React from "react";
import { DiYeoman } from "react-icons/di";

export default function ProfileLayout({ handlers, variables }: LayoutDashboardProps) {

  const data = [
    { client: "Danilo", corte: "Corte Simples", conta: false, status: "pago" },
    { client: "Danilo", corte: "Corte Degrade", conta: false, status: "pago" },
    { client: "Danilo", corte: "Corte 1", conta: true, status: "pago" },
    { client: "Danilo", corte: "Corte 1", conta: true, status: "pago" },
    { client: "Danilo", corte: "Corte 1", conta: false, status: "pago" },
  ]


  return (
    <>
      <Head>
        <title>{dashboardText?.title}</title>
      </Head>
      <Sidebar>
        <Flex background="barber.900" minH="100vh" alignItems="center" justifyContent="flex-start" direction="column">

          <Flex pt={8} pb={8} maxW="1200px" w="100%" direction="column">

            <Flex w="100%" direction="row" alignItems="center" justifyContent="flex-start">
              <Heading fontSize="3xl" color="orange.900" mt={6} mb={4} mr={4}>{dashboardText?.name}</Heading>
            </Flex>

            <Flex p={4} maxW="1200px" w="100%" direction="column" bg="barber.400" rounded={4} gap={4} >

              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={4}
                w="100%"
                justify="space-between"
              >
                <Flex direction="column" w="100%">
                  <Text color="white" mb={1} fontSize="xl" fontWeight="bold">
                    {dashboardText?.fatMonth}
                  </Text>
                  <Flex rounded={4} p={8} bg="#12131B" color="#fff" flex={1} w="100%"></Flex>
                </Flex>

                <Flex direction="column" w="100%" maxH="250px" >
                  <Text color="white" mb={1} fontSize="xl" fontWeight="bold">
                    {dashboardText?.fatInd}
                  </Text>
                  <Flex direction="column" rounded={4} p={4} bg="#12131B" color="#fff" flex={1} w="100%" overflowY="scroll">
                    {data?.map(barber => {
                      // const isItemLoading = variables?.loadingItemId === barber.id;
                      return (
                        // <Link key={barber.id} href={`/barbers/${barber.id}`} onClick={() => handlers?.handleClickItem(barber.id)} >
                        <Flex cursor="pointer" w="100%" p={4} bg="barber.400" rounded={4} mb={4} justifyContent="space-between">
                          <Flex direction="row" alignItems="center" justifyContent="center" >
                            <DiYeoman color="#fba931" size={28} />
                            <Text color="white" fontWeight="bold" ml={4} noOfLines={2}>{barber.client}</Text>
                          </Flex>
                        </Flex>

                      );
                    })}
                  </Flex>
                </Flex>

                <Flex direction="column" w="100%">
                  <Text color="white" mb={1} fontSize="xl" fontWeight="bold">
                    {dashboardText?.resume}
                  </Text>
                  <Flex rounded={4} p={8} bg="#12131B" color="#fff" flex={1} w="100%">

                  </Flex>
                </Flex>
              </Stack>

              <Flex direction='column' w='100%'>
                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">{dashboardText?.history}</Text>
                <Box p={4} bg='#12131B' color='#fff' overflowX="auto">
                  <Grid
                    templateColumns="repeat(4, 1fr)"
                    gap={4}
                    justifyContent="space-between"
                    alignItems="center"
                    minWidth="600px"
                    textAlign='center'

                  >

                    <GridItem >
                      <Text fontWeight="bold">Cliente</Text>
                    </GridItem>
                    <GridItem>
                      <Text fontWeight="bold">Barbeiro</Text>
                    </GridItem>
                    <GridItem>
                      <Text fontWeight="bold">Corte</Text>
                    </GridItem>
                    <GridItem>
                      <Text fontWeight="bold">Possui conta</Text>
                    </GridItem>

                    {data.map((item, index) => (
                      <React.Fragment key={index} >
                        <GridItem borderBottom='1px solid #fff' py={2} >
                          <Text>{item.client}</Text>
                        </GridItem>
                        <GridItem borderBottom='1px solid #fff' py={2} >
                          <Text>{item.corte}</Text>
                        </GridItem>
                        <GridItem borderBottom='1px solid #fff' py={2} >
                          <Text>{item.conta ? 'Sim' : 'Não'}</Text>
                        </GridItem>
                        <GridItem borderBottom='1px solid #fff' py={2} >
                          <Text>{item.status}</Text>
                        </GridItem>
                      </React.Fragment>
                    ))}
                  </Grid>
                </Box>
              </Flex>
            </Flex>

          </Flex>

        </Flex>
      </Sidebar >
    </>
  )
}



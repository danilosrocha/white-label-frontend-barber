import { Button, Flex, Heading, Spinner, Text, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import Head from "next/head";
import Link from "next/link";
import { DiYeoman } from "react-icons/di";
import { LayoutBarberProps } from "./Barbers.types";

export default function BarberLayout({ handlers, variables }: LayoutBarberProps) {
  const [isMobile] = useMediaQuery("(max-width: 800px)")
  return (
    <>
      <Head>
        <title>Barbeiros - Rocha's Client Barber</title>
      </Head>
      <Sidebar>
        <Flex background="barber.900" minH="100vh" alignItems="center" justifyContent="flex-start" direction="column">

          <Flex pt={8} pb={8} maxW="1200px" w="100%" direction="column">

            <Flex w="100%" direction={isMobile ? "column" : "row"} alignItems={isMobile ? "flex-start" : "center"} justifyContent="space-between" mt={6} mb={4} >

              <Flex mb={isMobile ? "10px" : "0"} >
                <Heading fontSize="3xl" mr={4} color="orange.900">Barbeiros</Heading>

                <Link href="/barbers/new" onClick={handlers?.handleRegisterCut}>
                  <Button color="white" bg="barber.400" _hover={{ bg: "gray.900" }} isLoading={variables?.loader}>
                    Cadastrar novo
                  </Button>
                </Link>
              </Flex>

            </Flex>

            {variables?.barbersList?.map(barber => {
              const isItemLoading = variables?.loadingItemId === barber.id;
              return (
                <Link key={barber.id} href={`/barbers/${barber.id}`} onClick={() => handlers?.handleClickItem(barber.id)} >
                  <Flex cursor="pointer" w="100%" p={4} bg="barber.400" direction={isMobile ? "column" : "row"} alignItems={isMobile ? "flex-start" : "center"} rounded={4} mb={4} justifyContent="space-between">
                    {isItemLoading ? <Spinner color='button.cta' speed='0.8s' size='md' /> : (
                      <>
                        <Flex direction="row" alignItems="center" justifyContent="center" mb={isMobile ? "10px" : "0"}>
                          <DiYeoman color="#fba931" size={28} />
                          <Text color="white" fontWeight="bold" ml={4} noOfLines={2}>{barber.barber_name}</Text>
                        </Flex>
                      </>
                    )}
                  </Flex>
                </Link>
              );
            })}
          </Flex>
        </Flex>
      </Sidebar >
    </>
  )
}

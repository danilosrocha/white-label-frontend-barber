import { Button, Flex, Heading, Spinner, Stack, Switch, Text, useMediaQuery, Box } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import Head from "next/head";
import Link from "next/link";
import { IoMdPricetag } from 'react-icons/io'
import { AiOutlinePlus, AiOutlineLine } from "react-icons/ai";
import React from "react";
import { LayoutHaircutProps } from "./Haircut.types";
import { FiScissors } from "react-icons/fi";

export default function HaircutLayout({ handlers, variables }: LayoutHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 800px)")

  return (
    <>
      <Head>
        <title>Modelos de cortes - Rocha's Client Barber</title>
      </Head>
      <Sidebar>
        <Flex background="barber.900" minH="100vh" alignItems="center" justifyContent="flex-start" direction="column" >

          <Flex pt={8} pb={8} maxW="1200px" w="100%" direction="column" >

            <Flex w="100%" direction={isMobile ? "column" : "row"} alignItems={isMobile ? "flex-start" : "center"} justifyContent="space-between" mt={6} mb={4} >

              <Flex mb={isMobile ? "10px" : "0"} direction={isMobile ? "column" : "row"} >
                <Heading fontSize="3xl" mr={4} color="orange.900">Modelos de corte</Heading>

                <Link href="/haircuts/new" onClick={handlers?.handleRegisterCut}>
                  <Button color="white" bg="barber.400" _hover={{ bg: "gray.900" }} isLoading={variables?.loader}>
                    Cadastrar novo
                  </Button>
                </Link>

              </Flex>
            </Flex>

            {variables?.haircuts && variables?.haircuts.map(barber => {
              return (
                <Box key={barber?.barber_name}>
                  <Flex align='center' mb={4} gap={3} w="100%" p={3} bg="barber.400" justify='space-between' >
                    <Flex align='center' justify='space-between'>
                      <FiScissors color="#fba931" size={28} />
                      <Heading fontSize="xl" color="white" ml={2} fontWeight="bold">Cortes de: {barber?.barber_name}</Heading>
                    </Flex>
                    <Button bg='transparent' _hover={{ bg: '#1B1C29' }} onClick={() => handlers?.handleShowHaircuts(barber.barber_name)}>
                      {variables?.showHaircuts[barber.barber_name] ? <AiOutlineLine color="#fff" size={20} /> : <AiOutlinePlus color="#fff" size={20} />}
                    </Button>
                  </Flex>
                  {variables?.showHaircuts[barber.barber_name] && barber?.haircuts?.map(haircut => {
                    const priceFormat = parseFloat(String(haircut?.price)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    const isItemLoading = variables?.loadingItemId === haircut.id;
                    if (haircut.status) {
                      return (
                        <Link key={haircut.id} href={`/haircuts/${haircut.id}`} onClick={() => handlers?.handleClickItem(haircut.id)} >
                          <Flex cursor="pointer" w="98%" p={4} bg="barber.400" direction={isMobile ? "column" : "row"} alignItems={isMobile ? "flex-start" : "center"} margin='1%' rounded={4} mb={4} justifyContent="space-between" >
                            {isItemLoading ? <Spinner color='button.cta' speed='0.8s' size='md' /> : (
                              <>
                                <Flex direction="row" alignItems="center" justifyContent="center" mb={isMobile ? "10px" : "0"}>
                                  <IoMdPricetag color="#fba931" size={26} />
                                  <Text color="white" fontWeight="bold" ml={4} noOfLines={2}>{haircut?.name} - </Text>
                                  <Text color="white" fontWeight="bold" ml={1}>{(haircut?.time)} min</Text>
                                </Flex>
                                <Text color="white" fontWeight="bold">Preço: {priceFormat}</Text>
                              </>
                            )}
                          </Flex>
                        </Link>
                      );
                    }
                    return null
                  })}
                </Box>
              )
            })}

          </Flex>
        </Flex>
      </Sidebar >
    </>
  )
}

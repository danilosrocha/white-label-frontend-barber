import { Button, Flex, Heading, Input, useMediaQuery, Text, Stack, Switch } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import Head from "next/head";
import Link from "next/link";
import { FiChevronLeft } from 'react-icons/fi'
import { LayoutBarberIdProps } from "./BarbersId.types";

export default function BarberIdLayout({ handlers, variables }: LayoutBarberIdProps) {
  const [isMobile] = useMediaQuery("(max-width: 800px)")

  return (
    <>
      <Head>
        <title>Editar dados barbeiro - Rocha's Client Barber</title>
      </Head>
      <Sidebar>
        <Flex background="barber.900" minH="100vh" alignItems="center" justifyContent="flex-start" direction="column">

          <Flex pt={8} pb={8} maxW="1200px" w="100%" direction="column" >

            <Flex w="100%" direction={isMobile ? "column" : "row"} alignItems={isMobile ? "flex-start" : "center"} justifyContent="space-between" mt={6} mb={4} >

              <Flex mb={isMobile ? "10px" : "0"} >

                <Link href="/barbers" onClick={handlers?.handleBackButton}>
                  <Button
                    isLoading={variables?.isLoading} color="white" bg="barber.400" _hover={{ bg: "gray.900" }} display="flex" alignItems="center" justifyContent="center"
                  >
                    <FiChevronLeft size={24} color="#fff" />
                    Voltar
                  </Button>
                </Link>

                <Heading fontSize="3xl" ml={4} color="orange.900">Dados do barbeiro</Heading>

              </Flex>

            </Flex>

            <Flex w="100%" bg="barber.400" align="center" justify="center" pt={8} pb={8} direction="column" rounded={4}>

              <Heading mb={4} fontSize="2xl" ml={4} color="white" >Editar dados</Heading>
              <Flex direction="column" w="85%" mb={6}>

                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Nome do barbeiro</Text>
                <Input color="white" placeholder="Nome" w="100%" bg="gray.900" type="text" size="lg" mb={3}
                  value={variables?.name}
                  onChange={(e) => handlers?.setName(e.target.value)}
                />

                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Horário de entrada</Text>
                <Input color="white" placeholder="Exemplo: 7:00" w="100%" bg="gray.900" type="text" size="lg" mb={3}
                  value={variables?.startWork}
                  onChange={(e) => handlers?.setStartWork(e.target.value)}
                />

                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Horário de saída</Text>
                <Input color="white" placeholder="Exemplo: 20:00" w="100%" bg="gray.900" type="text" size="lg"
                  value={variables?.endWork}
                  onChange={(e) => handlers?.setEndWork(e.target.value)}
                />
              </Flex>

              <Button
                isLoading={variables?.loader} onClick={handlers?.handleUpdateDataBarber} w="85%" mb={3} bg="button.cta" size="lg" _hover={{ bg: '#ffb13e' }}
              >
                Editar
              </Button>

              <Button
                isLoading={variables?.loaderDel} onClick={handlers?.handleDeleteBarber} w="85%" mb={6} bg="red.600" size="lg" _hover={{ bg: 'red.500' }}
              >
                Excluir barbeiro
              </Button>

            </Flex>

          </Flex>

        </Flex>
      </Sidebar >
    </>
  )
}

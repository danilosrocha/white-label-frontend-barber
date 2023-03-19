import { Button, Flex, Heading, Input, useMediaQuery, Text, Select } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import Head from "next/head";
import Link from "next/link";
import { FiChevronLeft } from 'react-icons/fi'
import { LayoutNewHaircutProps } from "./NewHaircut.types";

export default function NewHaircutLayout({ handlers, variables }: LayoutNewHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 800px)")

  return (
    <>
      <Head>
        <title>Modelos de cortes - Rocha's Client Barber</title>
      </Head>
      <Sidebar>
        <Flex background="barber.900" minH="100vh" alignItems="center" justifyContent="flex-start" direction="column">

          <Flex pt={8} pb={8} maxW="1200px" w="100%" direction="column" >

            <Flex w="100%" direction={isMobile ? "column" : "row"} alignItems={isMobile ? "flex-start" : "center"} justifyContent="space-between" mt={6} mb={4} >

              <Flex mb={isMobile ? "10px" : "0"} >

                <Link href="/haircuts" onClick={handlers?.handleBackButton}>
                  <Button
                    isLoading={variables?.isLoading} color="white" bg="barber.400" _hover={{ bg: "gray.900" }} display="flex" alignItems="center" justifyContent="center"
                  >
                    <FiChevronLeft size={24} color="#fff" />
                    Voltar
                  </Button>
                </Link>

                <Heading fontSize="3xl" ml={4} color="orange.900">Modelos de corte</Heading>

              </Flex>

            </Flex>

            <Flex w="100%" bg="barber.400" align="center" justify="center" pt={8} pb={8} direction="column" rounded={4}>

              <Heading mb={4} fontSize="2xl" ml={4} color="white" >Cadastrar modelo de corte</Heading>
              <Flex direction="column" w="85%">
                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Escolha o barbeiro:</Text>
                <Select
                  color="white"
                  w="100%"
                  bg="gray.900"
                  size="lg"
                  mb={3}
                  onChange={(e) => handlers?.handleChangeSelectBarber(e.target.value)}
                  defaultValue=""
                >
                  <option disabled value="">Selecione um barbeiro</option>
                  {variables?.barbers?.map(item => {
                    return (
                      <option style={{ background: "#1b1c29" }} key={item?.id} value={item?.id}>{item?.barber_name}</option>
                    )
                  })}
                </Select>

              </Flex>

              {variables?.barberSelected &&
                <Flex direction="column" w="85%">
                  <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Digite o nome do corte:</Text>
                  <Input color="white" placeholder="Nome do corte" w="100%" bg="gray.900" type="text" size="lg" mb={3}
                    value={variables?.name}
                    onChange={(e) => handlers?.setName(e.target.value)}
                  />
                </Flex>
              }

              {variables?.name &&
                <Flex direction="column" w="85%">
                  <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Digite o preço do corte:</Text>
                  <Input color="white" placeholder="Valor do corte ex: 59.90" w="100%" bg="gray.900" type="text" size="lg" mb={4}
                    value={variables?.price}
                    onChange={(e) => handlers?.setPrice(e.target.value)}
                  />
                </Flex>
              }

              {variables?.price &&
                <Flex direction="column" w="85%">
                  <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Digite o tempo do corte:</Text>
                  <Input color="white" placeholder="Tempo do corte ex: 30" w="100%" bg="gray.900" type="text" size="lg" mb={4}
                    value={variables?.time}
                    onChange={(e) => handlers?.setTime(e.target.value)}
                  />
                </Flex>
              }

              <Button
                isLoading={variables?.loader} onClick={handlers?.handleRegisterHaircut} w="85%" mb={6} bg="button.cta" size="lg" _hover={{ bg: '#ffb13e' }} isDisabled={!variables?.time}
              >
                Cadastrar
              </Button>

            </Flex>

          </Flex>

        </Flex>
      </Sidebar >
    </>
  )
}

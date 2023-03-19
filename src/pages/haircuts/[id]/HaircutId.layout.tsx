import { Button, Flex, Heading, Input, useMediaQuery, Text } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import Head from "next/head";
import Link from "next/link";
import { FiChevronLeft } from 'react-icons/fi'
import { LayoutHaircutIdProps } from "./HaircutId.types";

export default function EditHaircutLayout({ handlers, variables }: LayoutHaircutIdProps) {
  const [isMobile] = useMediaQuery("(max-width: 800px)")

  return (
    <>
      <Head>
        <title>Editar corte - Rocha's Client Barber</title>
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

              <Heading mb={4} fontSize="2xl" ml={4} color="white" >Editar corte</Heading>

              <Flex direction="column" w="85%">
                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Nome do corte:</Text>
                <Input color="white" placeholder={variables?.name} w="100%" bg="gray.900" type="text" size="lg" mb={3}
                  onChange={(e) => handlers?.setName(e.target.value)}
                />
              </Flex>

              <Flex direction="column" w="85%">
                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Valor do corte:</Text>
                <Input color="white" placeholder={variables?.precoFormatado} w="100%" bg="gray.900" type="text" size="lg" mb={3}
                  onChange={(e) => handlers?.setPrice(e.target.value)}
                />
              </Flex>

              <Flex direction="column" w="85%">
                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Tempo do corte:</Text>
                <Input color="white" placeholder={`${variables?.time} min`} w="100%" bg="gray.900" type="text" size="lg" mb={6}

                  onChange={(e) => handlers?.setTime(e.target.value)}
                />
              </Flex>

              <Button
                isLoading={variables?.loader} onClick={handlers?.handleUpdateHaircut} w="85%" mb={3} bg="button.cta" size="lg" _hover={{ bg: '#ffb13e' }}
              >
                Editar
              </Button>

              <Button
                isLoading={variables?.isLoadingDelete} onClick={handlers?.handleDeleteHaircut} w="85%" mb={4} bg="red.600" size="lg" _hover={{ bg: 'red.500' }}
              >
                Excluir o corte
              </Button>

            </Flex>

          </Flex>

        </Flex>
      </Sidebar >
    </>
  )
}

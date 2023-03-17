import { Button, Flex, Heading, Input, useMediaQuery, Text, Stack, Switch } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import Head from "next/head";
import Link from "next/link";
import { FiChevronLeft } from 'react-icons/fi'
import { ChangeEvent, useContext, useState } from "react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { HaircutContext } from "@/contexts/HaircutContext";
import { toast } from "react-toastify";
import { parseTimeString } from "@/utils/validatedTime";
import { BarberContext } from "@/contexts/BarberContext";

export interface BarberProps {
    id: string
    barber_name: string
    status: boolean
    hair_cuts: number
    available_at: string[]
    services: ServiceProps[]
}

export interface ServiceProps {
    id: string
    customer: string
    time: string
    haircut: HaircutProps
}

export interface HaircutProps {
    id: string
    name: string
    price: number
}

interface BarbersProps {
    barberDetail: BarberProps
    subscriptions: string | null
    barber_id: string
}

export default function EditBarber({ barberDetail, subscriptions, barber_id }: BarbersProps) {
    const { updateDataBarber, deleteBarber } = useContext(BarberContext)
    const [name, setName] = useState(barberDetail?.barber_name || "")
    const [startWork, setStartWork] = useState(barberDetail?.available_at[0] || "")
    const [endWork, setEndWork] = useState(barberDetail?.available_at[barberDetail?.available_at?.length - 1] || "")
    const [workTime, setWorkTime] = useState("10")
    const [loader, setLoader] = useState(false)
    const [loaderDel, setLoaderDel] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isMobile] = useMediaQuery("(max-width: 800px)")


    async function handleUpdateDataBarber() {
        if (!name) {
            toast.warning("Preencha todos os campos!")
            return
        }

        setLoader(true)
        const response = await handleValidatedTime()
        await updateDataBarber({ barber_name: name, barber_id, available_at: response })
        setLoader(false)
    }

    async function handleDeleteBarber() {
        if (!name) {
            toast.warning("Preencha todos os campos!")
            return
        }

        setLoaderDel(true)
        await deleteBarber(barber_id)
        setLoaderDel(false)
    }

    function handleBackButton() {
        setIsLoading(true);
    }

    async function handleValidatedTime() {
        return parseTimeString(startWork, endWork, Number(workTime))
    }

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

                                <Link href="/barbers" onClick={handleBackButton}>
                                    <Button
                                        isLoading={isLoading} color="white" bg="barber.400" _hover={{ bg: "gray.900" }} display="flex" alignItems="center" justifyContent="center"
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Horário de entrada</Text>
                                <Input color="white" placeholder="Exemplo: 7:00" w="100%" bg="gray.900" type="text" size="lg" mb={3}
                                    value={startWork}
                                    onChange={(e) => setStartWork(e.target.value)}
                                />

                                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Horário de saída</Text>
                                <Input color="white" placeholder="Exemplo: 20:00" w="100%" bg="gray.900" type="text" size="lg"
                                    value={endWork}
                                    onChange={(e) => setEndWork(e.target.value)}
                                />
                            </Flex>

                            <Button
                                isLoading={loader} onClick={handleUpdateDataBarber} w="85%" mb={3} bg="button.cta" size="lg" _hover={{ bg: '#ffb13e' }}
                            >
                                Editar
                            </Button>

                            <Button
                                isLoading={loaderDel} onClick={handleDeleteBarber} w="85%" mb={6} bg="red.600" size="lg" _hover={{ bg: 'red.500' }}
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

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try {
        const apiClient = setupAPIClient(ctx)
        const { id } = ctx.params

        const check = await apiClient.get('/check')

        const response = await apiClient.get('/barber',
            {
                params: {
                    barber_id: id
                }
            })

        return {
            props: {
                barberDetail: response.data,
                subscriptions: check.data?.subscriptions?.status === 'active' ? true : false,
                barber_id: id
            }

        }
    } catch (error) {
        console.log(error);
        return {
            redirect: {
                destination: '/haircuts',
                permanent: false
            }
        }

    }
})


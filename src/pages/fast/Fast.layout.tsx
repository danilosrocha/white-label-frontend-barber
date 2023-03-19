import { Button, Center, Flex, Heading, Input, Select, Text, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import logoImg from '../../../public/images/logo.svg'
import { ModalCalendary } from "@/components/modalCalendary";
import SelectTime from "@/components/timerPicker";
import { validatedAvaliableTime } from "@/utils/validatedAvaliableTime";
import { ModalResume } from "@/components/modalResume";
import FadeIn from "@/components/fadeIn";
import { LayoutFastProps } from "./Fast.types";

export default function FastLayout({ handlers, variables }: LayoutFastProps) {

  const [isMobile] = useMediaQuery("(max-width: 800px)")
  const [isMobileSmall] = useMediaQuery("(max-width: 500px)")

  return (
    <>
      <Head>
        <title>Agende seu corte - Rocha's client</title>
      </Head>

      <Flex direction={isMobile ? "column" : "row"} background="barber.900" minH="100vh" align="center" justify='center'>
        <FadeIn>
          <Flex align="center" justify='center' w='100%' p={isMobile ? 5 : 10} direction={isMobile ? "column" : "row"}>

            <Flex direction="column" align='center' justify='center' w="100%">
              <Heading fontSize={isMobile ? "3xl" : "5xl"} color="#EF871D" fontWeight="bold" textAlign='center' mb={isMobile ? 5 : 10}>Agendamento rápido
              </Heading>
              <Center mb={isMobile ? 5 : 10}>
                <Image
                  src={logoImg}
                  quality={100}
                  width={isMobile ? 150 : 450}
                  objectFit="fill"
                  alt="Logo Rocha's Client"
                />
              </Center>
            </Flex>

            <Flex
              borderLeft={isMobile ? "0px solid #fff" : "5px solid #fff"}
              borderTop={isMobile ? "4px solid #fff" : "0px solid #fff"}
              direction="column"
              w="100%" ml={isMobile ? 0 : 10} p={isMobile ? 0 : 10} >

              <Flex direction="column" w="100%">
                <Text color="white" mb={1} mt={isMobile ? 5 : 0} fontSize="xl" fontWeight="bold">Informe seu nome:</Text>
                <Input
                  background="#171922"
                  _hover={{ bg: "#1b1c29" }}
                  color="white"
                  variant="filled"
                  size="lg"
                  placeholder="Digite seu nome:"
                  type="text"
                  mb={3}
                  value={variables?.name}
                  onChange={(e) => handlers?.setName(e.target.value)}
                />
              </Flex>

              {variables?.name &&
                <FadeIn>
                  <Flex direction="column" w="100%">
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
                </FadeIn>
              }

              {variables?.barberSelected &&
                <FadeIn>
                  <Flex direction="column" w="100%">
                    <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Escolha o corte:</Text>
                    <Select
                      color="white"
                      w="100%"
                      bg="gray.900"
                      size="lg"
                      mb={3}
                      onChange={(e) => handlers?.handleChangeSelectHaircut(e.target.value)}
                      defaultValue=""
                    >
                      <option disabled value="">Selecione um corte</option>
                      {variables?.barberSelected?.haircuts.map(item => {
                        if (item.status) {
                          return (
                            <option style={{ background: "#1b1c29" }} key={item?.id} value={item?.id}>{item?.name}</option>
                          )
                        }
                        return null
                      })}
                    </Select>
                  </Flex>
                </FadeIn>
              }

              {variables?.haircutSelected &&
                <FadeIn>
                  <Flex align='end' justify='center' w="100%" mb={3} mt={3}>
                    {!variables?.availableTime ?
                      <Button onClick={handlers?.handleClickItem} w="100%" h="45px" bg='#fff' isLoading={variables?.showSpinner}>
                        {!variables?.date ? "Escolha o dia" : `Corte dia: ${variables?.date.getDate()}/${variables?.date.getMonth() + 1}`}
                        <ModalCalendary
                          isOpen={variables?.isOpen}
                          onClose={() => {
                            handlers?.setShowSpinner(true)
                            handlers?.onClose()
                          }}
                          onOpen={handlers?.onOpen}
                          setDate={handlers?.setDate}
                          date={variables?.date}
                          setDateSelected={handlers?.setDateSelected}
                        />
                      </Button> :
                      <FadeIn>
                        <Flex direction='column' w='100%'>
                          <Text color="white" mb={1} fontSize="xl" fontWeight="bold">Escolha o horário:</Text>
                          <Flex direction="row" align='center' justify='space-between' >
                            <SelectTime availableTime={validatedAvaliableTime(variables?.availableTime)} timeUsed={variables?.timeUsed} initialAvailableTime={validatedAvaliableTime(variables?.initialAvailableTime)} timesAlreadyUsed={validatedAvaliableTime(variables?.timesUsed)} setTimeToUsed={handlers?.setTimeToUsed} setOpenResume={handlers?.setOpenResume} />
                            <Button onClick={handlers?.handleClickItem} h="40px" w={isMobileSmall ? "30%" : (isMobile ? "50%" : "60%")} bg='white' p={1} isLoading={!variables?.showSpinner}>
                              {!variables?.date ? "Escolha o dia" : (isMobileSmall ? `Dia: ${variables?.date.getDate()}/${variables?.date.getMonth() + 1}` :
                                `Corte dia: ${variables?.date.getDate()}/${variables?.date.getMonth() + 1}`)}
                              {!variables?.openResume &&
                                <ModalCalendary
                                  isOpen={variables?.isOpen}
                                  onClose={handlers?.onClose}
                                  onOpen={handlers?.onOpen}
                                  setDate={handlers?.setDate}
                                  date={variables?.date}
                                  setDateSelected={handlers?.setDateSelected}
                                />}
                            </Button>
                          </Flex>
                        </Flex>
                      </FadeIn>
                    }
                  </Flex>
                </FadeIn>
              }

              {variables?.openResume &&
                <ModalResume
                  isOpen={variables?.isOpen}
                  onClose={handlers?.onClose}
                  onOpen={handlers?.onOpen}
                  openResume={variables?.openResume}
                  data={variables?.dataResume}
                  setOpenResume={handlers?.setOpenResume}
                />
              }

              <Button
                background="button.cta"
                mb={6}
                color="gray.900"
                h="45px"
                size="lg"
                _hover={{ bg: "#ffb13e" }}
                isLoading={variables?.loader}
                isDisabled={!variables?.timeToUsed}
                onClick={handlers?.handleRegister}
              >
                Agendar
              </Button>
            </Flex>

          </Flex>
        </FadeIn>
      </Flex>
    </>
  )
}

import { Button, Flex, Heading, Input, Select, Text, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";
import { Sidebar } from "@/components/sidebar";
import { LayoutNewProps } from "./New.types";
import { validatedAvaliableTime } from "@/utils/validatedAvaliableTime";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import SelectTime from "@/components/timerPicker";
import { ModalCalendary } from "@/components/modalCalendary";
import newText from "./New.language";

export default function NewLayout({ handlers, variables }: LayoutNewProps) {

  const [isMobile] = useMediaQuery("(max-width: 800px)")
  const [isMobileSmall] = useMediaQuery("(max-width: 500px)")

  return (
    <>
      <Head>
        <title>{newText?.title}</title>
      </Head>
      <Sidebar>
        <Flex background="barber.900" minH="100vh" alignItems="center" justifyContent="flex-start" direction="column">

          <Flex pt={8} pb={8} maxW="1200px" w="100%" direction="column" >

            <Flex w="100%" direction={isMobile ? "column" : "row"} alignItems={isMobile ? "flex-start" : "center"} justifyContent="space-between" mt={6} mb={4} >

              <Flex mb={isMobile ? "10px" : "0"} >

                <Link href="/schedule" onClick={handlers?.handleBackButton}>
                  <Button
                    isLoading={variables?.isLoading} color="white" bg="barber.400" _hover={{ bg: "gray.900" }} display="flex" alignItems="center" justifyContent="center"
                  >
                    <FiChevronLeft size={24} color="#fff" />
                    {newText?.btcBack}
                  </Button>
                </Link>

                <Heading fontSize="3xl" ml={4} color="orange.900">{newText?.haircut}</Heading>

              </Flex>

            </Flex>

            <Flex w="100%" bg="barber.400" align="center" justify="center" pt={8} pb={8} direction="column" rounded={4} >

              <Heading mb={4} fontSize="2xl" ml={4} color="white" >{newText?.schedule}</Heading>

              <Flex direction="column" w="85%">
                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">{newText?.tltName}</Text>
                <Input color="white" placeholder={newText?.plhName} w="100%" bg="gray.900" type="text" size="lg" mb={3}
                  value={variables?.customer}
                  onChange={(e) => handlers?.setCustomer(e.target.value)}
                />
              </Flex>

              {variables?.customer &&
                <Flex direction="column" w="85%">
                  <Text color="white" mb={1} fontSize="xl" fontWeight="bold">{newText?.tltBarber}</Text>
                  <Select
                    color="white"
                    w="100%"
                    bg="gray.900"
                    size="lg"
                    mb={3}
                    onChange={(e) => handlers?.handleChangeSelectBarber(e.target.value)}
                    defaultValue=""
                  >
                    <option disabled value="">{newText?.sltBarber}</option>
                    {variables?.barbers?.map(item => {
                      return (
                        <option style={{ background: "#1b1c29" }} key={item?.id} value={item?.id}>{item?.barber_name}</option>
                      )
                    })}
                  </Select>
                </Flex>
              }

              {variables?.barberSelected &&
                <Flex direction="column" w="85%">
                  <Text color="white" mb={1} fontSize="xl" fontWeight="bold">{newText?.tltHaircut}</Text>
                  <Select
                    color="white"
                    w="100%"
                    bg="gray.900"
                    size="lg"
                    mb={3}
                    onChange={(e) => handlers?.handleChangeSelectHaircut(e.target.value)}
                    defaultValue=""
                  >
                    <option disabled value="">{newText?.sltHaircut}</option>
                    {variables?.haircuts?.map(item => {
                      return (
                        <option style={{ background: "#1b1c29" }} key={item?.id} value={item?.id}>{item?.name}</option>
                      )
                    })}
                  </Select>
                </Flex>
              }

              {variables?.haircutSelected &&
                <Flex align='end' justify='center' w="85%" mb={3}>
                  {!variables?.availableTime ?
                    <Button onClick={handlers?.handleClickItem} w="100%" h="45px" bg='#fff' isLoading={variables?.showSpinner}>
                      {!variables?.date ? `${newText?.tltDate1}` : `${newText?.tltDate2} ${variables?.dateSelected}`}
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
                    <Flex direction='column' w='100%'>
                      <Text color="white" mb={1} fontSize="xl" fontWeight="bold">{newText?.tltTime}</Text>
                      <Flex direction="row" align='center' justify='space-between' >
                        <SelectTime availableTime={validatedAvaliableTime(variables?.availableTime)} timeUsed={variables?.timeUsed} initialAvailableTime={validatedAvaliableTime(variables?.initialAvailableTime)} timesAlreadyUsed={validatedAvaliableTime(variables?.timesUsed)} setTimeToUsed={handlers?.setTimeToUsed} setOpenResume={handlers?.setOpenResume} />
                        <Button onClick={handlers?.handleClickItem} h="40px" w={isMobileSmall ? "30%" : (isMobile ? "50%" : "60%")} bg='white' p={1}>
                          {!variables?.date ? "Escolha o dia" : (isMobileSmall ? `Dia: ${variables?.date.getDate()}/${variables?.date.getMonth() + 1}` :
                            `Corte dia: ${variables?.date.getDate()}/${variables?.date.getMonth() + 1}`)}
                          <ModalCalendary
                            isOpen={variables?.isOpen}
                            onClose={handlers?.onClose}
                            onOpen={handlers?.onOpen}
                            setDate={handlers?.setDate}
                            date={variables?.date}
                            setDateSelected={handlers?.setDateSelected}
                          />
                        </Button>
                      </Flex>
                    </Flex>
                  }

                </Flex>
              }

              <Button
                isDisabled={!variables?.timeToUsed} isLoading={variables?.loader} onClick={handlers?.handleRegister} w="85%" mb={6} bg="button.cta" size="lg" _hover={{ bg: '#ffb13e' }}
              >
                {newText?.btaSchedule}
              </Button>

            </Flex>

          </Flex>

        </Flex>
      </Sidebar >
    </>
  )
}

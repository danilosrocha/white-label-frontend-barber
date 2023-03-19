import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import Head from "next/head";
import { Sidebar } from "@/components/sidebar";
import { LayoutProfileProps } from "./Profile.types";
import profileText from "./Profile.language";

export default function ProfileLayout({ handlers, variables }: LayoutProfileProps) {

  return (
    <>
      <Head>
        <title>{profileText?.title}</title>
      </Head>
      <Sidebar>
        <Flex background="barber.900" minH="100vh" alignItems="center" justifyContent="flex-start" direction="column">

          <Flex pt={8} pb={8} maxW="1200px" w="100%" direction="column">

            <Flex w="100%" direction="row" alignItems="center" justifyContent="flex-start">
              <Heading fontSize="3xl" color="orange.900" mt={6} mb={4} mr={4}>{profileText?.account}</Heading>
            </Flex>

            <Flex pt={8} pb={8} maxW="1200px" w="100%" direction="column" alignItems="center" justifyContent="center" bg="barber.400" gap={4} rounded={4}>

              <Flex direction="column" w="85%" >
                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">{profileText?.name}</Text>
                <Input color="white" placeholder={profileText?.name} w="100%" bg="gray.900" type="text" size="lg"
                  value={variables?.name}
                  onChange={(e) => handlers?.setName(e.target.value)}
                />
              </Flex>

              <Flex direction="column" w="85%" >
                <Text color="white" mb={1} fontSize="xl" fontWeight="bold">{profileText?.address}</Text>
                <Input color="white" placeholder={profileText?.address} w="100%" bg="gray.900" type="text" size="lg"
                  value={variables?.address}
                  onChange={(e) => handlers?.setAddress(e.target.value)}
                />
              </Flex>

              <Flex direction="column" w="85%">
                <Button
                  isLoading={variables?.loader} onClick={handlers?.handleUpdateUser} w="100%" mt={3} mb={3} bg="button.cta" size="lg" _hover={{ bg: '#ffb13e' }}
                >
                  {profileText?.btaSave}
                </Button>
                <Button
                  onClick={handlers?.handleLogout} w="100%" mb={4} bg="red.600" size="lg" _hover={{ bg: 'red.500' }}
                >
                  {profileText?.btaLogout}
                </Button>
              </Flex>

            </Flex>

          </Flex>

        </Flex>
      </Sidebar>
    </>
  )
}

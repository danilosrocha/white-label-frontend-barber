import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logoImg from '../../../public/images/logo.svg'
import { FiEyeOff, FiEye } from "react-icons/fi";
import { LayoutLoginProps } from "./Login.types";
import loginText from "./Login.language";

export default function LoginLayout({handlers, variables}: LayoutLoginProps) {

  return (
    <>
      <Head>
        <title>{loginText.title}</title>
      </Head>
      <Flex background="barber.900" minH="100vh" alignItems="center" justifyContent="center">
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4} mb={3}>
            <Image
              src={logoImg}
              quality={100}
              width={300}
              objectFit="fill"
              alt="Logo Rocha's Client"
            />
          </Center>

          <Input
            background="barber.400"
            _hover={{ bg: "#1b1c29" }}
            color="white"
            variant="filled"
            size="lg"
            placeholder={loginText.email}
            type="email"
            mb={3}
            value={variables?.email}
            onChange={(e) => handlers?.setEmail(e.target.value)}
          />

          <Flex direction="row" alignItems="center" justifyContent="space-between" background="barber.400" mb={6} rounded={8} position="relative">
            <Input
              background="barber.400"
              color="white"
              variant="filled"
              size="lg"
              placeholder={loginText.password}
              type={variables?.typePassword}
              value={variables?.password}
              _hover={{ bg: "#1b1c29" }}
              onChange={(e) => handlers?.setPassword(e.target.value)}

            />
            <Button onClick={handlers?.handleShowPassword} position="absolute" right={0} bg="transparent" _hover={{ bg: "transparent" }}>
              {variables?.showPassword ? <FiEye color="white" /> : <FiEyeOff color="white" />}
            </Button>
          </Flex>

          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
            isLoading={variables?.loader}
            onClick={handlers?.handleLogin}
          >
            {loginText.buttonText}
          </Button>

          <Center mt={2}>
            <Link href="/register">
              <Text color="white" cursor="pointer">{loginText.linkText} <strong>{loginText.linkTextStrong}</strong></Text>
            </Link>
          </Center>

        </Flex>
      </Flex>
    </>
  )
}

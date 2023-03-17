import { AuthContext } from "@/contexts/AuthContext";
import { canSSRGuest } from "@/utils/canSSRGuest";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import LoginLayout from "./Login.layout";
import { HandlersLoginType, VariablesLoginType } from "./Login.types";

export default function Login() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [typePassword, setTypePassword] = useState("password")

  async function handleLogin() {
    if (!email || !password) {
      toast.warning("Preencha todos os campos!")
      return
    }
    setLoader(true)
    await signIn({ email, password })
    setLoader(false)
  }

  function handleShowPassword() {
    setShowPassword(!showPassword)
    if (showPassword !== false) {
      setTypePassword('password')
      return
    }
    setTypePassword('text')
  }

  const variables = {
    email,
    password,
    loader,
    showPassword,
    typePassword
  } as VariablesLoginType

  const handlers = {
    setEmail,
    setPassword,
    setShowPassword,
    setLoader,
    setTypePassword,
    handleLogin,
    handleShowPassword,
  } as HandlersLoginType

  return (
    <>
      <LoginLayout
        handlers={handlers}
        variables={variables}
      />
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {

  return {
    props: {}
  }
})
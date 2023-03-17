import { AuthContext } from "@/contexts/AuthContext";
import { canSSRGuest } from "@/utils/canSSRGuest";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import RegisterLayout from "./Register.layout";
import { HandlersRegisterType, VariablesRegisterType } from "./Register.types";

export default function Register() {
  const { signUp } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [typePassword, setTypePassword] = useState("password")

  async function handleRegister() {
    if (!name || !email || !password) {
      toast.warning("Preencha todos os campos!")
      return
    }

    setLoader(true)
    await signUp({ name, email, password, code })
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
    name,
    code,
    email,
    password,
    loader,
    showPassword,
    typePassword,
  } as VariablesRegisterType

  const handlers = {
    setCode,
    setName,
    setEmail,
    setPassword,
    setShowPassword,
    setLoader,
    setTypePassword,
    handleShowPassword,
    handleRegister,
  } as HandlersRegisterType

  return (
    <>
      <RegisterLayout
        handlers={handlers}
        variables={variables}
      />
    </>
  )
}

export const getServerSideProps = canSSRGuest(async () => {

  return {
    props: {

    }

  }
})

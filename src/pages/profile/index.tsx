import { AuthContext } from "@/contexts/AuthContext";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { useContext, useState } from "react";
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import ProfileLayout from "./Profile.layout";
import { HandlersProfileType, VariablesProfileType } from "./Profile.types";

interface UserProps {
  id: string
  name: string
  email: string
  address: string | null
}

interface ProfileProps {
  user: UserProps,
  premium: boolean
}

export default function Profile({ user, premium }: ProfileProps) {
  const { logoutUser, updateUser } = useContext(AuthContext)
  const [name, setName] = useState(user?.name || "")
  const [address, setAddress] = useState(user?.address || "")
  const [loader, setLoader] = useState(false)

  async function handleLogout() {
    await logoutUser()
  }

  async function handleUpdateUser() {
    if (!name) {
      toast.error("Preencha o nome!")
      return
    }
    setLoader(true)
    await updateUser({ name, address })
    setLoader(false)
  }

  const variables = {
    address,
    loader,
    name
  } as VariablesProfileType

  const handlers = {
    setName,
    setAddress,
    handleLogout,
    handleUpdateUser,
  } as HandlersProfileType

  return (
    <>
      <ProfileLayout
        handlers={handlers}
        variables={variables}
      />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/me')

    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      address: response.data?.address
    }

    return {
      props: {
        user,
        premium: response.data?.subscriptions?.status === "active" ? true : false
      }

    }
  } catch (err) {
    console.log(err);

    return {
      redirect: {
        destination: '/schedule',
        permanent: false
      }
    }
  }
})





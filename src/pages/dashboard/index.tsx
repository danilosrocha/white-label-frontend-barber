import { AuthContext } from "@/contexts/AuthContext";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { useContext, useState } from "react";
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import ProfileLayout from "./Dashboard.layout";
import { HandlersDashboardType, VariablesDashboardType } from "./Dashboard.types";

interface UserProps {
  id: string
  name: string
  email: string
  address: string | null
}

interface ProfileProps {
  user: UserProps,
}

export default function Dashboard({ user }: ProfileProps) {
  const { logoutUser, updateUser } = useContext(AuthContext)
  const [name, setName] = useState(user?.name || "")
  const [address, setAddress] = useState(user?.address || "")
  const [loader, setLoader] = useState(false)
  const [loadingItemId, setLoadingItemId] = useState(null)

  async function handleUpdateUser() {
    if (!name) {
      toast.error("Preencha o nome!")
      return
    }
    setLoader(true)
    await updateUser({ name, address })
    setLoader(false)
  }

  function handleClickItem(id: string) {
    setLoadingItemId(id);
  }

  const variables: VariablesDashboardType = {
    address,
    loader,
    name,
    loadingItemId
  }

  const handlers: HandlersDashboardType = {
    setName,
    setAddress,
    handleClickItem,
    handleUpdateUser,
  }

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





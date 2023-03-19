import { useContext, useState } from "react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import { parseTimeString } from "@/utils/validatedTime";
import { BarberContext } from "@/contexts/BarberContext";
import { BarbersProps, HandlersBarberIdType, VariablesBarberIdType } from "./[id]/BarbersId.types";
import BarberIdLayout from "./[id]/BarbersId.layout";

export default function EditBarber({ barberDetail, barber_id }: BarbersProps) {
    const { updateDataBarber, deleteBarber } = useContext(BarberContext)
    const [name, setName] = useState(barberDetail?.barber_name || "")
    const [startWork, setStartWork] = useState(barberDetail?.available_at[0] || "")
    const [endWork, setEndWork] = useState(barberDetail?.available_at[barberDetail?.available_at?.length - 1] || "")
    const [workTime, setWorkTime] = useState("10")
    const [loader, setLoader] = useState(false)
    const [loaderDel, setLoaderDel] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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

    const variables: VariablesBarberIdType = {
        name,
        startWork,
        endWork,
        workTime,
        loader,
        loaderDel,
        isLoading,
    }

    const handlers: HandlersBarberIdType = {
        setName,
        setStartWork,
        setEndWork,
        setWorkTime,
        setLoader,
        setLoaderDel,
        setIsLoading,
        handleUpdateDataBarber,
        handleDeleteBarber,
        handleValidatedTime,
        handleBackButton,
    }

    return (
        <>
            <BarberIdLayout
                handlers={handlers}
                variables={variables}
            />
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


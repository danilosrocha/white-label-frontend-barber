import { ChangeEvent, useContext, useState } from "react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { HaircutContext } from "@/contexts/HaircutContext";
import { toast } from "react-toastify";
import { validatedValueHaircut } from "@/utils/validatedValueHaircut";
import { parseOneTimeString } from "@/utils/validatedTime";
import { HandlersHaircutIdType, VariablesHaircutIdType } from "./[id]/HaircutId.types";
import EditHaircutLayout from "./[id]/HaircutId.layout";

export interface DetailProps {
    id: string
    name: string
    price: number | string
    status: boolean
    user_id: string
    time: string
}

interface HaircutProps {
    haircutDetail: DetailProps
    subscriptions: string | null
}

export default function EditHaircut({ haircutDetail, subscriptions }: HaircutProps) {
    const { updateHaircut } = useContext(HaircutContext)
    const [name, setName] = useState(haircutDetail?.name || "")
    const [price, setPrice] = useState(haircutDetail?.price || "")
    const [haircut_id, setHaircut_id] = useState(haircutDetail?.id || "")
    const [time, setTime] = useState(haircutDetail?.time || "")
    const [loader, setLoader] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [disableHaircut, setDisableHaircut] = useState(haircutDetail?.status === true ? "enabled" : "disabled")
    const precoFormatado = parseFloat(String(price)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    async function handleUpdateHaircut() {
        if (!name || !price) {
            toast.warning("Preencha todos os campos!")
            return
        }

        const newPrice = (validatedValueHaircut(price))
        const newTime = (parseOneTimeString(time))

        setLoader(true)
        await updateHaircut({ name, haircut_id, status: disableHaircut, price: newPrice, time: newTime })
        setLoader(false)
    }

    function handleDisable(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value === "disabled") {
            setDisableHaircut("enabled")
            return
        }
        setDisableHaircut("disabled")
    }

    function handleBackButton() {
        setIsLoading(true);
    }

    async function handleDeleteHaircut() {
        const newPrice = (validatedValueHaircut(price))
        const newTime = (parseOneTimeString(time))
        setIsLoadingDelete(true)
        await updateHaircut({ name, haircut_id, status: "disable", price: newPrice, time: newTime })
        setIsLoadingDelete(false)
    }

    const variables: VariablesHaircutIdType = {
        name,
        price,
        haircut_id,
        time,
        loader,
        isLoading,
        isLoadingDelete,
        disableHaircut,
        precoFormatado,
    }

    const handlers: HandlersHaircutIdType = {
        setName,
        setPrice,
        setHaircut_id,
        setTime,
        setLoader,
        setIsLoading,
        setIsLoadingDelete,
        setDisableHaircut,
        handleUpdateHaircut,
        handleDisable,
        handleBackButton,
        handleDeleteHaircut,
    }

    return (
        <>
            <EditHaircutLayout
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

        const response = await apiClient.get('/haircut/detail',
            {
                params: {
                    haircut_id: id
                }
            })

        return {
            props: {
                haircutDetail: response.data,
                subscriptions: check.data?.subscriptions?.status === 'active' ? true : false
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


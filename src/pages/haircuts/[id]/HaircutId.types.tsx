import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface DetailProps {
    id: string
    name: string
    price: number | string
    status: boolean
    user_id: string
    time: string
}

export interface HaircutProps {
    haircutDetail: DetailProps
    subscriptions: string | null
}

export type LayoutHaircutIdProps = {
    variables: VariablesHaircutIdType
    handlers: HandlersHaircutIdType
};

export type VariablesHaircutIdType = {
    name: string
    price: string | number
    haircut_id: string
    time: string
    loader: boolean
    isLoading: boolean
    isLoadingDelete: boolean
    disableHaircut: string
    precoFormatado: string
};

export type HandlersHaircutIdType = {
    setName: Dispatch<SetStateAction<string>>,
    setPrice: Dispatch<SetStateAction<string>>,
    setHaircut_id: Dispatch<SetStateAction<string>>,
    setTime: Dispatch<SetStateAction<string>>,
    setLoader: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsLoadingDelete: Dispatch<SetStateAction<boolean>>,
    setDisableHaircut: Dispatch<SetStateAction<string>>,
    handleUpdateHaircut: () => Promise<void>,
    handleDisable: (e: ChangeEvent<HTMLInputElement>) => void
    handleBackButton: () => void,
    handleDeleteHaircut: () => Promise<void>,
};

export type HaircutLanguageType = {
    title: string,
    account: string,
    name: string
    address: string,
    btaSave: string,
    btaLogout: string
};

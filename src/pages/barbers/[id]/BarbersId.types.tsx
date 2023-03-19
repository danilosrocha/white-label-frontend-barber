import { Dispatch, SetStateAction } from "react";

export interface BarberProps {
    id: string
    barber_name: string
    status: boolean
    hair_cuts: number
    available_at: string[]
    services: ServiceProps[]
}

export interface ServiceProps {
    id: string
    customer: string
    time: string
    haircut: HaircutProps
}

export interface HaircutProps {
    id: string
    name: string
    price: number
}

export interface BarbersProps {
    barberDetail: BarberProps
    subscriptions: string | null
    barber_id: string
}

export type LayoutBarberIdProps = {
    variables: VariablesBarberIdType
    handlers: HandlersBarberIdType
};

export type VariablesBarberIdType = {
    name: string,
    startWork: string
    endWork: string
    workTime: string
    loader: boolean
    loaderDel: boolean
    isLoading: boolean
};

export type HandlersBarberIdType = {
    setName: Dispatch<SetStateAction<string>>,
    setStartWork: Dispatch<SetStateAction<string>>,
    setEndWork: Dispatch<SetStateAction<string>>,
    setWorkTime: Dispatch<SetStateAction<string>>,
    setLoader: Dispatch<SetStateAction<boolean>>,
    setLoaderDel: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    handleUpdateDataBarber: () => Promise<void>,
    handleDeleteBarber: () => Promise<void>,
    handleValidatedTime: () => Promise<any[]>,
    handleBackButton: () => void,
};

export type BarberLanguageType = {
    title: string,
    account: string,
    name: string
    address: string,
    btaSave: string,
    btaLogout: string
};

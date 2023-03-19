import { Dispatch, SetStateAction } from "react";

export interface BarberProps {
    id: string
    barber_name: string
    hair_cuts: number
    status: boolean
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
    barbers: BarberProps[]
}

export type LayoutBarberProps = {
    variables: VariablesBarberType
    handlers: HandlersBarberType
};

export type VariablesBarberType = {
    barbersList: BarberProps[]
    loader: boolean
    loadingItemId: string
    disableHaircut: string
};

export type HandlersBarberType = {
    setBarbersList: Dispatch<SetStateAction<BarberProps[]>>,
    setLoader: Dispatch<SetStateAction<boolean>>,
    setLoadingItemId: Dispatch<SetStateAction<boolean>>,
    setDisableHaircut: Dispatch<SetStateAction<string>>,
    handleRegisterCut: () => void,
    handleClickItem: (id: string) => void,
};

export type BarberLanguageType = {
    title: string,
    account: string,
    name: string
    address: string,
    btaSave: string,
    btaLogout: string
};

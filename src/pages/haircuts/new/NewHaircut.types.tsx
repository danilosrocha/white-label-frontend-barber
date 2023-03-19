import { Dispatch, SetStateAction } from "react";

export interface BarbersItem {
    id: string
    barber_name: string
    hair_cuts: number
    status: boolean
    available_at?: string[]
}

export interface NewHaircutProps {
    subscriptions: string,
    count: number,
    barbers: BarbersItem[]
}

export type LayoutNewHaircutProps = {
    variables: VariablesNewHaircutType
    handlers: HandlersNewHaircutType
};

export type VariablesNewHaircutType = {
    name: string
    price: string
    time: string
    loader: boolean
    isLoading: boolean
    barberSelected: BarbersItem
    barbers: BarbersItem[]
};

export type HandlersNewHaircutType = {
    setName: Dispatch<SetStateAction<string>>,
    setPrice: Dispatch<SetStateAction<string>>,
    setTime: Dispatch<SetStateAction<string>>,
    setLoader: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setBarberSelected: Dispatch<SetStateAction<BarbersItem>>,
    handleRegisterHaircut: () => Promise<void>,
    handleChangeSelectBarber: (id: string) => Promise<void>,
    handleBackButton: () => void,
};

export type NewHaircutLanguageType = {
    title: string,
    account: string,
    name: string
    address: string,
    btaSave: string,
    btaLogout: string
};

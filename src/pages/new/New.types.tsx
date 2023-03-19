import { Dispatch, SetStateAction } from "react";

export interface HaircutsItem {
    id: string
    name: string
    price: number | string
    status: boolean
    user_id: string
    time: string
}

export interface BarbersItem {
    id: string
    barber_name: string
    hair_cuts: number
    status: boolean
    available_at?: string[]
}

export interface HaircutsProps {
    haircuts: HaircutsItem[],
    barbers: BarbersItem[],
}

export type LayoutNewProps = {
    variables: VariablesNewType
    handlers: HandlersNewType
};

export type VariablesNewType = {
    customer: string,
    loader: boolean,
    isLoading: boolean,
    showSpinner: boolean,
    barbers: BarbersItem[],
    haircuts: HaircutsItem[],
    barberSelected: BarbersItem,
    haircutSelected: HaircutsItem,
    dateSelected: string,
    availableTime: string[],
    initialAvailableTime: string[],
    timeUsed: number,
    timesUsed: string[],
    timeToUsed: string[],
    date: Date,
    isOpen: boolean
};

export type HandlersNewType = {
    setCustomer: Dispatch<SetStateAction<string>>,
    setDateSelected: Dispatch<SetStateAction<string>>,
    setHaircutSelected: Dispatch<SetStateAction<HaircutsItem>>,
    setBarberSelected: Dispatch<SetStateAction<BarbersItem>>,
    setLoader: Dispatch<SetStateAction<boolean>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setShowSpinner: Dispatch<SetStateAction<boolean>>
    setOpenResume: Dispatch<SetStateAction<boolean>>
    setAvailableTime: Dispatch<SetStateAction<string[]>>
    setInitialAvailableTime: Dispatch<SetStateAction<string[]>>
    setTimesUsed: Dispatch<SetStateAction<string[]>>
    setTimeToUsed: Dispatch<SetStateAction<string[]>>
    setDate: Dispatch<SetStateAction<Date>>
    handleRegister: () => Promise<void>,
    handleBackButton: () => void,
    handleChangeSelectHaircut: (id: string) => Promise<void>,
    handleChangeSelectBarber: (id: string) => Promise<void>,
    handleClickItem: () => void,
    onOpen: () => void
    onClose: () => void
};

export type NewLanguageType = {
    title: string,
    haircut: string,
    schedule: string,
    tltName: string,
    plhName: string,
    tltBarber: string,
    sltBarber: string,
    tltHaircut: string,
    sltHaircut: string,
    tltDate1: string,
    tltDate2: string,
    tltTime: string,
    btaSchedule: string
    btcBack: string
};

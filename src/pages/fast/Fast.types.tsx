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
    haircuts: HaircutsItem[]
}

export interface HaircutsProps {
    barbers: BarbersItem[]
    user: {
        id: string
    }
}

export type LayoutFastProps = {
    variables: VariablesFastType
    handlers: HandlersFastType
};

export type VariablesFastType = {
    name: string,
    loader: boolean,
    barberSelected: BarbersItem,
    user_id: string,
    availableTime: string[],
    dateSelected: string,
    date: Date,
    initialAvailableTime: string[],
    timesUsed: string[],
    haircutSelected: HaircutsItem,
    timeToUsed: string[],
    showSpinner: boolean,
    openResume: boolean,
    dataResume: undefined,
    barbers: BarbersItem[],
    timeUsed: number,
    isOpen: boolean
};

export type HandlersFastType = {
    setName: Dispatch<SetStateAction<string>>,
    setLoader: Dispatch<SetStateAction<boolean>>
    setBarberSelected: Dispatch<SetStateAction<BarbersItem>>,
    setUserId: Dispatch<SetStateAction<string>>,
    setAvailableTime: Dispatch<SetStateAction<string[]>>
    setInitialAvailableTime: Dispatch<SetStateAction<string[]>>
    setDateSelected: Dispatch<SetStateAction<string>>,
    setDate: Dispatch<SetStateAction<Date>>
    setTimesUsed: Dispatch<SetStateAction<string[]>>
    setTimeToUsed: Dispatch<SetStateAction<string[]>>
    setHaircutSelected: Dispatch<SetStateAction<HaircutsItem>>,
    setShowSpinner: Dispatch<SetStateAction<boolean>>
    setDataResume: Dispatch<SetStateAction<string>>,
    setOpenResume: Dispatch<SetStateAction<boolean>>
    handleRegister: () => Promise<void>,
    handleChangeSelectHaircut: (id: string) => void,
    handleChangeSelectBarber: (id: string) => Promise<void>,
    handleClickItem: () => void,
    onOpen: () => void
    onClose: () => void
};

export type FastLanguageType = {
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

import { Dispatch, SetStateAction } from "react";

export interface ScheduleItem {
    id: string
    customer: string
    time: string
    date: string
    haircut: {
        id: string
        name: string
        price: number | string
        status: boolean
        user_id: string
    }
    barber: {
        barber_name: string
    }
}

export interface ScheduleProps {
    schedule: ScheduleItem[]
    days: string[]
}

export type LayoutScheduleProps = {
    variables: VariablesScheduleType
    handlers: HandlersScheduleType
};

export type VariablesScheduleType = {
    list: ScheduleItem[],
    service: ScheduleItem,
    loader: boolean,
    loadingFinish: boolean,
    loadingCancel: boolean,
    days: string[]
    isOpen: boolean
};

export type HandlersScheduleType = {
    setList: Dispatch<SetStateAction<ScheduleItem[]>>,
    setService: Dispatch<SetStateAction<ScheduleItem>>
    setLoader: Dispatch<SetStateAction<boolean>>,
    setLoadingFinish: Dispatch<SetStateAction<boolean>>,
    setLoadingCancel: Dispatch<SetStateAction<boolean>>,
    handleRegisterCut: () => void,
    handleClickItem: (item: ScheduleItem) => void,
    handleFinish: (id: string) => Promise<void>,
    handleCancelSchedule: (id: string) => Promise<void>,
    onOpen: () => void
    onClose: () => void
};

export type ScheduleLanguageType = {
    title: string,
    schedule: string,
    register: string,
    date: string,
    linkText: string,
    linkTextStrong: string
};
import { Dispatch, SetStateAction } from "react";

export interface HaircutsBarber {
    haircuts: BarberHaircuts[]
}
export interface BarberHaircuts {
    barber_name: string
    id: string
    haircuts: Haircut[]
}
export interface Haircut {
    id: string
    name: string
    price: number
    status: boolean
    time: string
    user_id: string
    barber_id: string
}

export type LayoutHaircutProps = {
    variables: VariablesHaircutType
    handlers: HandlersHaircutType
};

export type VariablesHaircutType = {
    loader: boolean,
    loadingItemId: string,
    showHaircuts: object,
    haircuts: BarberHaircuts[]
};

export type HandlersHaircutType = {
    setLoader: Dispatch<SetStateAction<boolean>>,
    setLoadingItemId: Dispatch<SetStateAction<string>>,
    setShowHaircuts: Dispatch<SetStateAction<object>>,
    handleRegisterCut: () => void,
    handleClickItem: (haircutId: string) => void,
    handleShowHaircuts: (barberName: string) => void,
};

export type HaircutLanguageType = {
    title: string,
    account: string,
    name: string
    address: string,
    btaSave: string,
    btaLogout: string
};

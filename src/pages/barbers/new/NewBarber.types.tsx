import { Dispatch, SetStateAction } from "react";

export type LayoutNewBarberProps = {
    variables: VariablesNewBarberType
    handlers: HandlersNewBarberType
};

export type VariablesNewBarberType = {
    name: string,
    startWork: string,
    endWork: string,
    workTime: string,
    loader: boolean,
    isLoading: boolean,
};

export type HandlersNewBarberType = {
    setName: Dispatch<SetStateAction<string>>,
    setStartWork: Dispatch<SetStateAction<string>>,
    setEndWork: Dispatch<SetStateAction<string>>,
    setWorkTime: Dispatch<SetStateAction<string>>,
    setLoader: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    handleRegisterBarber: () => Promise<void>,
    handleValidatedTime: () => Promise<any[]>,
    handleBackButton: () => void,
};

export type NewBarberLanguageType = {
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

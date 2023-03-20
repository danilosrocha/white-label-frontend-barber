import { Dispatch, SetStateAction } from "react";

export type LayoutDashboardProps = {
    variables: VariablesDashboardType
    handlers: HandlersDashboardType
};

export type VariablesDashboardType = {
    name: string,
    address: string,
    loader: boolean,
    loadingItemId: string,
};

export type HandlersDashboardType = {
    setName: Dispatch<SetStateAction<string>>,
    setAddress: Dispatch<SetStateAction<string>>
    handleUpdateUser: () => void,
    handleClickItem: (id: string) => void,
};

export type DashboardLanguageType = {
    title: string,
    account: string,
    name: string
    address: string,
    btaSave: string,
    btaLogout: string
    history: string
    fatMonth: string
    fatInd: string
    resume: string
};

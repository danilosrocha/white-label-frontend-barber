import { Dispatch, SetStateAction } from "react";

export interface UserProps {
    id: string
    name: string
    email: string
    address: string | null
}

export interface ProfileProps {
    user: UserProps,
    premium: boolean
}

export type LayoutProfileProps = {
    variables: VariablesProfileType
    handlers: HandlersProfileType
};

export type VariablesProfileType = {
    name: string,
    address: string,
    loader: boolean,
};

export type HandlersProfileType = {
    setName: Dispatch<SetStateAction<string>>,
    setAddress: Dispatch<SetStateAction<string>>
    handleUpdateUser: () => void,
    handleLogout: () => void,
};

export type ProfileLanguageType = {
    title: string,
    account: string,
    name: string
    address: string,
    btaSave: string,
    btaLogout: string
};

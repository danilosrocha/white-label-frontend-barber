import { Dispatch, SetStateAction } from "react";

export type LayoutLoginProps = {
    variables: VariablesLoginType
    handlers: HandlersLoginType
};

export type VariablesLoginType = {
    email: string,
    password: string,
    typePassword: string,
    loader: boolean,
    showPassword: boolean,
};

export type HandlersLoginType = {
    setEmail: Dispatch<SetStateAction<string>>,
    setPassword: Dispatch<SetStateAction<string>>
    setTypePassword: Dispatch<SetStateAction<string>>
    setShowPassword: Dispatch<SetStateAction<boolean>>,
    setLoader: Dispatch<SetStateAction<boolean>>,
    handleLogin: () => void,
    handleShowPassword: () => void,
};

export type LoginLanguageType = {
    title: string,
    email: string,
    password: string,
    buttonText: string,
    linkText: string,
    linkTextStrong: string
};

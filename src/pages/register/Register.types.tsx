import { Dispatch, SetStateAction } from "react";

export type LayoutRegisterProps = {
    variables: VariablesRegisterType
    handlers: HandlersRegisterType
};

export type VariablesRegisterType = {
    name: string,
    code: string,
    email: string,
    password: string,
    loader: boolean,
    typePassword: string,
    showPassword: boolean,
};

export type HandlersRegisterType = {
    setName: Dispatch<SetStateAction<string>>,
    setCode: Dispatch<SetStateAction<string>>,
    setEmail: Dispatch<SetStateAction<string>>,
    setPassword: Dispatch<SetStateAction<string>>
    setLoader: Dispatch<SetStateAction<boolean>>,
    setTypePassword: Dispatch<SetStateAction<string>>
    setShowPassword: Dispatch<SetStateAction<boolean>>,
    handleRegister: () => void,
    handleShowPassword: () => void,
};

export type RegisterLanguageType = {
    title: string,
    name: string
    code: string
    email: string,
    password: string,
    buttonText: string,
    linkText: string,
    linkTextStrong: string
};

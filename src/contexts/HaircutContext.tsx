import { createContext, ReactNode, useState, useEffect } from "react";
import Router from "next/router";
import { api } from "@/services/apiClient";
import { toast } from 'react-toastify';
import { setupAPIClient } from "@/services/api";

interface HaircutContextData {
    registerHaircut: (credential: RegisterHaircutProps) => Promise<void>
    listHaircuts: (credential: string) => Promise<HaircutsItem[]>
    updateHaircut: (credential: UpdateHaircutProps) => Promise<void>
    registerNewCut: (credential: RegisteNewCutProps) => Promise<void>
    registerNewCutFast: (credential: RegisteScheduleProps) => Promise<void>
    finishCut: (credential: FinishCutProps) => Promise<void>
    listHaircutsBarber: (credential: string) => Promise<BarberHaircuts[]>
}

interface HaircutsItem {
    id: string
    name: string
    price: number | string
    status: boolean
    user_id: string
    barber_id: string
}

interface RegisterHaircutProps {
    name: string
    price: number | string
    time: string
    barber_id: string
}

type HaircutProviderProps = {
    children: ReactNode
}

interface UpdateHaircutProps {
    haircut_id: string
    name: string
    price: number | string
    status: string
    time: string
}

interface RegisteNewCutProps {
    customer: string
    haircut_id: string
    barber_id: string
    time: string
    date: string
    time_occuped: string[]
}
interface RegisteScheduleProps {
    customer: string
    haircut_id: string
    barber_id: string
    time: string
    date: string
    user_id: string
    time_occuped: string[]
}

interface FinishCutProps {
    id: string,
    status: string
}

interface BarberHaircuts {
    barber_name: string
    id: string
    haircuts: Haircut[]
}

interface Haircut {
    id: string
    name: string
    price: number
    status: boolean
    time: string
    created_at: string
    updated_at: string
    user_id: string
    barber_id: string
}


export const HaircutContext = createContext({} as HaircutContextData)

export function HaircutProvider({ children }: HaircutProviderProps) {

    async function registerHaircut({ name, price, time, barber_id }: RegisterHaircutProps) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.post('/haircut', {
                name: name,
                price: Number(price),
                time,
                barber_id
            })

            Router.push("/haircuts")
            toast.success("Corte cadastrado com sucesso!")
        } catch (err) {
            console.log(err);
            toast.error("Erro ao cadastrar corte!")
        }
    }

    async function listHaircuts(status: string) {

        const boStats = status === "enabled" ? false : true

        try {
            const apiClient = setupAPIClient();
            const response = await apiClient.get('/haircuts', {
                params: {
                    status: boStats
                }
            })

            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    async function updateHaircut({ name, price, haircut_id, status, time }: UpdateHaircutProps) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put('/haircut', {
                haircut_id,
                name,
                price: Number(price),
                status: status === "enabled" ? "true" : "false",
                time,
            })

            Router.push('/haircuts')
            if (status !== "enabled") {
                toast.success("Corte excluído com sucesso!")
            } else {
                toast.success("Corte atualizado com sucesso!")
            }

        } catch (error) {
            console.log(error);
            toast.error("Erro ao cadastrar corte!")
        }
    }

    async function registerNewCut({ customer, haircut_id, barber_id, date, time, time_occuped }: RegisteNewCutProps) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.post('/schedule', {
                customer,
                haircut_id,
                barber_id,
                date,
                time,
                time_occuped
            })
            Router.push('/schedule')
            toast.success("Agendamento realizado com sucesso!")
        } catch (error) {
            if (error.response.data.error === "Error: Schedule already exists!") {
                toast.warning("Este horário já possui um cliente agendado!")
                return
            }
            toast.error("Erro ao cadastrar agendamento!")
        }
    }

    async function registerNewCutFast({ customer, haircut_id, barber_id, date, time, user_id, time_occuped }: RegisteScheduleProps) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.post('/schedule/fast', {
                customer,
                haircut_id,
                barber_id,
                date,
                time,
                user_id,
                time_occuped,
            })
            toast.success("Agendamento realizado com sucesso!")
        } catch (error) {
            if (error.response.data.error === "Error: Schedule already exists!") {
                toast.warning("Este horário já possui um cliente agendado!")
                return
            }
            toast.error("Erro ao cadastrar agendamento!")
        }
    }

    async function listHaircutsBarber(status: string) {

        const boStats = status === "enabled" ? false : true

        try {
            const apiClient = setupAPIClient();
            const response = await apiClient.get('/haircuts/barber', {
                params: {
                    status: boStats
                }
            })

            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    async function finishCut({ id, status }: FinishCutProps) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.delete('/schedule', {
                params: {
                    schedule_id: id,
                    status,
                }
            })
            Router.push('/schedule')
            if (status === "finish") {
                toast.success("Serviço finalizado!")
            } else {
                toast.success("Serviço excluído!")
            }
        } catch (error) {
            console.log(error);
            toast.error("Erro ao finalizar corte!")
        }
    }


    return (
        <HaircutContext.Provider value={{ registerHaircut, listHaircuts, updateHaircut, registerNewCut, finishCut, registerNewCutFast, listHaircutsBarber }}>
            {children}
        </HaircutContext.Provider>
    )
}
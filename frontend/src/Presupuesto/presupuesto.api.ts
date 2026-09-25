import api from "../api/axiosClient";
import type { Presupuesto,createPresupuestoDto } from "./presupuesto.types";

export const presupuestoApi = {
    getAll: async():Promise<Presupuesto[]> => {
        const {data} = await api.get<Presupuesto[]>(`/presupuesto`);
        return data;
    },

    getArchivados: async():Promise<Presupuesto[]> => {
        const {data} = await api.get<Presupuesto[]>(`/presupuesto/archivados`);
        return data;
    },

    getOne: async(id:number): Promise<Presupuesto> => {
        const {data} = await api.get<Presupuesto>(`/presupuesto/${id}`);
        return data;
    },

    create: async(dto:createPresupuestoDto):Promise<Presupuesto> => {
        const {data} = await api.post<Presupuesto>(`/presupuesto`,dto);
        return data;
    },

    restore: async(id:number):Promise<Presupuesto> => {
        const {data} = await api.patch<Presupuesto>(`/presupuesto/${id}/restaurar`);
        return data;
    },

    remove: async(id:number):Promise<void> => {
        await api.delete<void>(`/presupuesto/${id}`);
    }
}
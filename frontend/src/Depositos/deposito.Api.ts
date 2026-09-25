import api from "../api/axiosClient";
import type { Deposito,createDepositoDto,updateDepositoDto } from "./deposito.types";

export const depositoApi = {
    getAll: async():Promise<Deposito[]> => {
        const {data} = await api.get<Deposito[]>(`/deposito`);
        return data;
    },

    getArchivadas: async():Promise<Deposito[]> => {
        const {data} = await api.get<Deposito[]>(`/deposito/archivados`);
        return data;
    },

    getOne: async(id:number):Promise<Deposito> => {
        const {data} = await api.get<Deposito>(`/deposito/${id}`);
        return data;
    },

    create: async(dto:createDepositoDto):Promise<Deposito> => {
        const {data} = await api.post<Deposito>(`/deposito`,dto);
        return data;
    },

    update: async(id:number,dto:updateDepositoDto):Promise<Deposito> => {
        const {data} = await api.patch<Deposito>(`/deposito/${id}`,dto);
        return data;
    },

    restore: async(id:number):Promise<Deposito> => {
        const {data} = await api.patch<Deposito>(`/deposito/${id}/restaurar`);
        return data;
    },

    remove: async(id:number):Promise<void> => {
        await api.delete(`/deposito/${id}`);
    }
}
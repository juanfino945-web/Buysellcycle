import api from "../api/axiosClient";
import type { Cliente,createClienteDto,updateCLienteDto } from "./clientes.types";

export const clienteApi = {
    getAll: async():Promise<Cliente[]> => {
        const {data} = await api.get<Cliente[]>(`/cliente`);
        return data;
    },

    getArchivadas: async():Promise<Cliente[]> => {
        const {data} = await api.get<Cliente[]>(`/cliente/archivados`);
        return data;
    },

    getOne: async(id:number):Promise<Cliente> => {
        const {data} = await api.get<Cliente>(`/cliente/${id}`);
        return data;
    },

    create: async(dto:createClienteDto):Promise<Cliente> => {
        const {data} = await api.post<Cliente>(`/cliente/`,dto);
        return data;
    },

    update: async(id:number,dto:updateCLienteDto):Promise<Cliente> => {
        const {data} = await api.patch<Cliente>(`/cliente/${id}`,dto);
        return data;
    },

    restore: async(id:number):Promise<Cliente> => {
        const {data} = await api.patch<Cliente>(`/cliente/${id}/restaurar`);
        return data;
    },

    remove: async(id:Number):Promise<void> => {
        const {data} = await api.delete(`/cliente/${id}`);
        return data;
    }
}
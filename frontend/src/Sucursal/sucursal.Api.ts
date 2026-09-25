import api from "../api/axiosClient";
import type { Sucursal,createSucursalDto,updateSucursalDto } from "./sucursal.types";

export const sucursalApi = {
    getAll: async(): Promise<Sucursal[]> => {
        const {data} = await api.get<Sucursal[]>(`/sucursal`);
        return data;
    },

    getArchivadas: async(): Promise<Sucursal[]> => {
        const {data} = await api.get<Sucursal[]>(`/sucursal/archivadas`);
        return data;
    },

    getOne: async(id:number):Promise<Sucursal> => {
        const {data} = await api.get<Sucursal>(`/sucursal/${id}`);
        return data;
    },

    create: async(dto:createSucursalDto):Promise<Sucursal> => {
        const {data} = await api.post<Sucursal>(`/sucursal`,dto);
        return data;
    },

    update: async(id:number,dto:updateSucursalDto):Promise<Sucursal> => {
        const {data} = await api.patch<Sucursal>(`/sucursal/${id}`,dto);
        return data;
    },

    restore: async(id:number):Promise<Sucursal> => {
        const {data} = await api.patch<Sucursal>(`/sucursal/${id}/restaurar`);
        return data;
    },

    remove: async(id:Number):Promise<void> => {
        await api.delete<void>(`sucursal/${id}`);
    },
};
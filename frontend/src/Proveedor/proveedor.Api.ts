import api from "../api/axiosClient";
import type { Proveedor,createProveedorDto,updateProveedorDto } from "./proveedor.types";

export const proveedorApi = {
    getAll: async():Promise<Proveedor[]> => {
        const {data} = await api.get<Proveedor[]>(`/proveedor`);
        return data;
    },

    getArchivados: async():Promise<Proveedor[]> => {
        const {data} = await api.get<Proveedor[]>(`/proveedor/archivados`);
        return data;
    },

    getOne: async(id:number):Promise<Proveedor> => {
        const {data} = await api.get<Proveedor>(`/proveedor/${id}`);
        return data;
    },

    create: async(dto:createProveedorDto):Promise<Proveedor> => {
        const {data} = await api.post<Proveedor>(`/proveedor`,dto);
        return data;
    },

    update: async(id:number,dto:updateProveedorDto):Promise<Proveedor> => {
        const {data} = await api.patch<Proveedor>(`/proveedor/${id}`,dto);
        return data;
    },

    restore: async(id:number):Promise<Proveedor> => {
        const {data} = await api.patch<Proveedor>(`/proveedor/${id}/restaurar`);
        return data;
    },

    remove: async(id:number):Promise<void> => {
        await api.delete(`/proveedor/${id}`);
    },
}
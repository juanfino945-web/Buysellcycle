import api from "../api/axiosClient";
import type { Usuario,createUsuarioDto,updateUsuarioDto } from "./usuario.types";

export const usuarioApi = {
    getAll: async():Promise<Usuario[]> => {
        const {data} = await api.get<Usuario[]>(`/usuario`);
        return data;
    },

    getArchivados: async():Promise<Usuario[]> => {
        const {data} = await api.get<Usuario[]>(`/usuario/archivados`);
        return data;
    },

    getOne: async(id:number):Promise<Usuario> => {
        const {data} = await api.get<Usuario>(`/usuario/${id}`);
        return data;
    },

    create: async(dto:createUsuarioDto):Promise<Usuario> => {
        const {data} = await api.post<Usuario>(`/usuario`,dto);
        return data;
    },

    update: async(id:number,dto:updateUsuarioDto):Promise<Usuario> => {
        const {data} = await api.patch<Usuario>(`/usuario/${id}`,dto);
        return data;
    },

    restore: async(id:number):Promise<Usuario> => {
        const {data} = await api.patch<Usuario>(`/usuario/${id}/restaurar`);
        return data;
    },

    remove: async(id:number):Promise<void> => {
        await api.delete(`/usuario/${id}`);
    }
}
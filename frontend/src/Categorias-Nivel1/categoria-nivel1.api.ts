import api from "../api/axiosClient";
import type {
    CategoriaNivel1,
    createCategoriaNivel1Dto,
    updateCategoriaNvel1Dto
} from './categoria-nivel1.types';

export const categoriaNivel1Api = {
    getAll: async() : Promise<CategoriaNivel1[]> => {
        const {data} = await api.get<CategoriaNivel1[]>('/categoria-nivel1');
        return data;
    },

    getArchivadas: async(): Promise<CategoriaNivel1[]> => {
        const {data} = await api.get<CategoriaNivel1[]>('/categoria-nivel1/archivadas');
        return data;
    },

    getOne: async(id:number): Promise<CategoriaNivel1> => {
        const {data} = await api.get<CategoriaNivel1>(`/categoria-nivel1/${id}`);
        return data;
    },

    create: async(dto:createCategoriaNivel1Dto): Promise<CategoriaNivel1> => {
        const {data} = await api.post<CategoriaNivel1>(`/categoria-nivel1/`,dto);
        return data;
    },

    update: async(id:number,dto:updateCategoriaNvel1Dto): Promise<CategoriaNivel1> => {
        const{data} = await api.patch<CategoriaNivel1>(`/categoria-nivel1/${id}`,dto);
        return data;
    },

    restore: async(id:number): Promise<CategoriaNivel1> => {
        const {data} = await api.patch<CategoriaNivel1>(`/categoria-nivel1/${id}/restaurar`);
        return data;
    },

    remove: async(id:number): Promise<void> => {
        const {data} = await api.delete(`/categoria-nivel1/${id}`);
        return data;
    }
}


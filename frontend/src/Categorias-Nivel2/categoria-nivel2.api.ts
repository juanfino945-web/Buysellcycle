import api from '../api/axiosClient';
import type { CategoriaNivel2,createCategoriaNivel2Dto,updateCategoriaNivel2Dto } from './categoria-nivel2.types';

export const categoriaNivel2Api = {

    getAll: async(): Promise<CategoriaNivel2[]> => {
        const {data} = await api.get<CategoriaNivel2[]>(`/categoria-nivel2`);
        return data;        
    },

    getArchivadas: async(): Promise<CategoriaNivel2[]> => {
        const {data} = await api.get<CategoriaNivel2[]>(`/categoria-nivel2/archivadas`);
        return data;
    },

    getOne: async(id:number): Promise<CategoriaNivel2> => {
        const {data} = await api.get<CategoriaNivel2>(`/categoria-nivel2/${id}`);
        return data;
    },

    create: async(dto:createCategoriaNivel2Dto): Promise<CategoriaNivel2> => {
        const {data} = await api.post<CategoriaNivel2>(`/categoria-nivel2`,dto);
        return data;
    },

    update: async(id:number,dto:updateCategoriaNivel2Dto): Promise<CategoriaNivel2> => {
        const {data} = await api.patch<CategoriaNivel2>(`/categoria-nivel2/${id}`,dto);
        return data;
    },

    restore: async(id:number): Promise<CategoriaNivel2> => {
        const {data} = await api.patch<CategoriaNivel2>(`/categoria-nivel2/${id}/restaurar`);
        return data;
    },

    remove: async(id:number): Promise<void> => {
        const {data} = await api.delete(`/categoria-nivel2/${id}`);
        return data;
    },

}
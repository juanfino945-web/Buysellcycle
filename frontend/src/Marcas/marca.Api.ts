import api from '../api/axiosClient';
import type { Marca, createMarcaDto, updateMarcaDto } from './marca.types';

export const marcaApi = {
    getAll: async (): Promise<Marca[]> => {
        const { data } = await api.get<Marca[]>('/marca');
        return data;
    },

    getArchivadas: async (): Promise<Marca[]> => {
        const { data } = await api.get<Marca[]>('/marca/archivadas');
        return data;
    },

    getOne: async (id: number): Promise<Marca> => {
        const { data } = await api.get<Marca>(`/marca/${id}`);
        return data;
    },

    create: async (dto: createMarcaDto): Promise<Marca> => {
        const { data } = await api.post<Marca>('/marca', dto);
        return data;
    },

    update: async (id: number, dto: updateMarcaDto): Promise<Marca> => {
        const { data } = await api.patch<Marca>(`/marca/${id}`, dto);
        return data;
    },

    restore: async (id: number): Promise<Marca> => {
        const { data } = await api.patch<Marca>(`/marca/${id}/restaurar`);
        return data;
    },

    remove: async (id: number): Promise<void> => {
        await api.delete<void>(`/marca/${id}`);
    },
};
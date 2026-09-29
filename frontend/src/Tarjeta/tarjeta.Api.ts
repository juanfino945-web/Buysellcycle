import api from '../api/axiosClient';
import type { Tarjeta, createTarjetaDto, updateTarjetaDto } from './tarjeta.types';

export const tarjetaApi = {
  getAll: async (): Promise<Tarjeta[]> => {
    const { data } = await api.get<Tarjeta[]>('/tarjetas');
    return data;
  },

  getArchivadas: async (): Promise<Tarjeta[]> => {
    const { data } = await api.get<Tarjeta[]>('/tarjetas/archivadas');
    return data;
  },

  getOne: async (id: number): Promise<Tarjeta> => {
    const { data } = await api.get<Tarjeta>(`/tarjetas/${id}`);
    return data;
  },

  create: async (dto: createTarjetaDto): Promise<Tarjeta> => {
    const { data } = await api.post<Tarjeta>('/tarjetas', dto);
    return data;
  },

  update: async (id: number, dto: updateTarjetaDto): Promise<Tarjeta> => {
    const { data } = await api.patch<Tarjeta>(`/tarjetas/${id}`, dto);
    return data;
  },

  restore: async (id: number): Promise<Tarjeta> => {
    const { data } = await api.patch<Tarjeta>(`/tarjetas/${id}/restaurar`);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete<void>(`/tarjetas/${id}`);
  },
};
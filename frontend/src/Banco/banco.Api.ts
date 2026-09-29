import api from '../api/axiosClient';
import type { Banco, createBancoDto, updateBancoDto } from './banco.types';

export const bancoApi = {
  getAll: async (): Promise<Banco[]> => {
    const { data } = await api.get<Banco[]>('/bancos');
    return data;
  },

  getArchivadas: async (): Promise<Banco[]> => {
    const { data } = await api.get<Banco[]>('/bancos/archivados');
    return data;
  },

  getOne: async (id: number): Promise<Banco> => {
    const { data } = await api.get<Banco>(`/bancos/${id}`);
    return data;
  },

  create: async (dto: createBancoDto): Promise<Banco> => {
    const { data } = await api.post<Banco>('/bancos', dto);
    return data;
  },

  update: async (id: number, dto: updateBancoDto): Promise<Banco> => {
    const { data } = await api.patch<Banco>(`/bancos/${id}`, dto);
    return data;
  },

  restore: async (id: number): Promise<Banco> => {
    const { data } = await api.patch<Banco>(`/bancos/${id}/restaurar`);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete<void>(`/bancos/${id}`);
  },
};
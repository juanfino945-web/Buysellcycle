import api from '../api/axiosClient';
import type { Plan, createPlanDto, updatePlanDto } from './plan.types';

export const planApi = {
  getAll: async (): Promise<Plan[]> => {
    const { data } = await api.get<Plan[]>('/planes');
    return data;
  },

  getArchivados: async (): Promise<Plan[]> => {
    const { data } = await api.get<Plan[]>('/planes/archivados');
    return data;
  },

  getOne: async (id: number): Promise<Plan> => {
    const { data } = await api.get<Plan>(`/planes/${id}`);
    return data;
  },

  create: async (dto: createPlanDto): Promise<Plan> => {
    const { data } = await api.post<Plan>('/planes', dto);
    return data;
  },

  update: async (id: number, dto: updatePlanDto): Promise<Plan> => {
    const { data } = await api.patch<Plan>(`/planes/${id}`, dto);
    return data;
  },

  restore: async (id: number): Promise<Plan> => {
    const { data } = await api.patch<Plan>(`/planes/${id}/restaurar`);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete<void>(`/planes/${id}`);
  },

  getFiltrados: async (params: { tarjetaId?: number; bancoId?: number }): Promise<Plan[]> => {
  const { data } = await api.get<Plan[]>('/planes', { params });
  return data;
},
};
import api from '../api/axiosClient';
import type {
  Producto,
  CreateProductoDto,
  UpdateProductoDto,
} from './producto.types';

export const productoApi = {
  getAll: async (): Promise<Producto[]> => {
    const { data } = await api.get<Producto[]>('/producto');
    return data;
  },

  getArchivados: async (): Promise<Producto[]> => {
    const { data } = await api.get<Producto[]>('/producto/archivados');
    return data;
  },

  getOne: async (id: number): Promise<Producto> => {
    const { data } = await api.get<Producto>(`/producto/${id}`);
    return data;
  },

  create: async (dto: CreateProductoDto): Promise<Producto> => {
    const { data } = await api.post<Producto>('/producto', dto);
    return data;
  },

  update: async (id: number, dto: UpdateProductoDto): Promise<Producto> => {
    const { data } = await api.patch<Producto>(`/producto/${id}`, dto);
    return data;
  },

  restore: async (id: number): Promise<Producto> => {
    const { data } = await api.patch<Producto>(`/producto/${id}/restaurar`);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/producto/${id}`);
  },
};
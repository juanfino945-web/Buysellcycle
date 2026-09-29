import { create } from 'zustand';
import { bancoApi } from './banco.Api';
import type { Banco, createBancoDto, updateBancoDto } from './banco.types';

interface BancoState {
  bancos: Banco[];
  bancosArchivados: Banco[];
  bancoActual: Banco | null;
  loading: boolean;
  error: string | null;

  fetchBancos: () => Promise<void>;
  fetchBancosArchivados: () => Promise<void>;
  fetchBancoPorId: (id: number) => Promise<void>;
  crearBanco: (dto: createBancoDto) => Promise<void>;
  actualizarBanco: (id: number, dto: updateBancoDto) => Promise<void>;
  eliminarBanco: (id: number) => Promise<void>;
  restaurarBanco: (id: number) => Promise<void>;
  limpiarBancoActual: () => void;
}

export const useBancoStore = create<BancoState>((set, get) => ({
  bancos: [],
  bancosArchivados: [],
  bancoActual: null,
  loading: false,
  error: null,

  fetchBancos: async () => {
    set({ loading: true, error: null });
    try {
      const bancos = await bancoApi.getAll();
      set({ bancos, loading: false });
    } catch (error) {
      set({ error: 'error al cargar bancos', loading: false });
    }
  },

  fetchBancosArchivados: async () => {
    set({ loading: true, error: null });
    try {
      const bancosArchivados = await bancoApi.getArchivadas();
      set({ bancosArchivados, loading: false });
    } catch (error) {
      set({ error: 'error al cargar los bancos archivados', loading: false });
    }
  },

  fetchBancoPorId: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const banco = await bancoApi.getOne(id);
      set({ bancoActual: banco, loading: false });
    } catch (error) {
      set({ error: 'error al cargar el banco', loading: false });
    }
  },

  crearBanco: async (dto: createBancoDto) => {
    set({ loading: true, error: null });
    try {
      const nuevoBanco = await bancoApi.create(dto);
      set({ bancos: [...get().bancos, nuevoBanco], loading: false });
    } catch (error) {
      set({ error: 'error al crear el banco', loading: false });
      throw error;
    }
  },

  actualizarBanco: async (id: number, dto: updateBancoDto) => {
    set({ loading: true, error: null });
    try {
      const bancoActualizado = await bancoApi.update(id, dto);
      set({
        bancos: get().bancos.map((b) => (b.id === id ? bancoActualizado : b)),
        bancosArchivados: get().bancosArchivados.map((b) =>
          b.id === id ? bancoActualizado : b,
        ),
        bancoActual: bancoActualizado,
        loading: false,
      });
    } catch (error) {
      set({ error: 'error al actualizar el banco', loading: false });
      throw error;
    }
  },

  eliminarBanco: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await bancoApi.remove(id);
      set({
        bancos: get().bancos.filter((b) => b.id !== id),
        loading: false,
      });
    } catch (error) {
      set({ error: 'error al eliminar el banco', loading: false });
      throw error;
    }
  },

  restaurarBanco: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const bancoRestaurado = await bancoApi.restore(id);
      set({
        bancos: [bancoRestaurado, ...get().bancos],
        bancosArchivados: get().bancosArchivados.filter((b) => b.id !== id),
        loading: false,
      });
    } catch (error) {
      set({ error: 'error al desarchivar el banco', loading: false });
      throw error;
    }
  },

  limpiarBancoActual: () => set({ bancoActual: null }),
}));
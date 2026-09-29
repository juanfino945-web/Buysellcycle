import { create } from 'zustand';
import { tarjetaApi } from './tarjeta.Api';
import type { Tarjeta, createTarjetaDto, updateTarjetaDto } from './tarjeta.types';

interface TarjetaState {
  tarjetas: Tarjeta[];
  tarjetasArchivadas: Tarjeta[];
  tarjetaActual: Tarjeta | null;
  loading: boolean;
  error: string | null;

  fetchTarjetas: () => Promise<void>;
  fetchTarjetasArchivadas: () => Promise<void>;
  fetchTarjetaPorId: (id: number) => Promise<void>;
  crearTarjeta: (dto: createTarjetaDto) => Promise<void>;
  actualizarTarjeta: (id: number, dto: updateTarjetaDto) => Promise<void>;
  eliminarTarjeta: (id: number) => Promise<void>;
  restaurarTarjeta: (id: number) => Promise<void>;
  limpiarTarjetaActual: () => void;
}

export const useTarjetaStore = create<TarjetaState>((set, get) => ({
  tarjetas: [],
  tarjetasArchivadas: [],
  tarjetaActual: null,
  loading: false,
  error: null,

  fetchTarjetas: async () => {
    set({ loading: true, error: null });
    try {
      const tarjetas = await tarjetaApi.getAll();
      set({ tarjetas, loading: false });
    } catch (error) {
      set({ error: 'error al cargar tarjetas', loading: false });
    }
  },

  fetchTarjetasArchivadas: async () => {
    set({ loading: true, error: null });
    try {
      const tarjetasArchivadas = await tarjetaApi.getArchivadas();
      set({ tarjetasArchivadas, loading: false });
    } catch (error) {
      set({ error: 'error al cargar las tarjetas archivadas', loading: false });
    }
  },

  fetchTarjetaPorId: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const tarjeta = await tarjetaApi.getOne(id);
      set({ tarjetaActual: tarjeta, loading: false });
    } catch (error) {
      set({ error: 'error al cargar la tarjeta', loading: false });
    }
  },

  crearTarjeta: async (dto: createTarjetaDto) => {
    set({ loading: true, error: null });
    try {
      const nuevaTarjeta = await tarjetaApi.create(dto);
      set({ tarjetas: [...get().tarjetas, nuevaTarjeta], loading: false });
    } catch (error) {
      set({ error: 'error al crear la tarjeta', loading: false });
      throw error;
    }
  },

  actualizarTarjeta: async (id: number, dto: updateTarjetaDto) => {
    set({ loading: true, error: null });
    try {
      const tarjetaActualizada = await tarjetaApi.update(id, dto);
      set({
        tarjetas: get().tarjetas.map((t) => (t.id === id ? tarjetaActualizada : t)),
        tarjetasArchivadas: get().tarjetasArchivadas.map((t) =>
          t.id === id ? tarjetaActualizada : t,
        ),
        tarjetaActual: tarjetaActualizada,
        loading: false,
      });
    } catch (error) {
      set({ error: 'error al actualizar la tarjeta', loading: false });
      throw error;
    }
  },

  eliminarTarjeta: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await tarjetaApi.remove(id);
      set({
        tarjetas: get().tarjetas.filter((t) => t.id !== id),
        loading: false,
      });
    } catch (error) {
      set({ error: 'error al eliminar la tarjeta', loading: false });
      throw error;
    }
  },

  restaurarTarjeta: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const tarjetaRestaurada = await tarjetaApi.restore(id);
      set({
        tarjetas: [tarjetaRestaurada, ...get().tarjetas],
        tarjetasArchivadas: get().tarjetasArchivadas.filter((t) => t.id !== id),
        loading: false,
      });
    } catch (error) {
      set({ error: 'error al desarchivar la tarjeta', loading: false });
      throw error;
    }
  },

  limpiarTarjetaActual: () => set({ tarjetaActual: null }),
}));
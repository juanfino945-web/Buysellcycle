import { create } from 'zustand';
import { planApi } from './plan.Api';
import type { Plan, createPlanDto, updatePlanDto } from './plan.types';

interface PlanState {
  planes: Plan[];
  planesArchivados: Plan[];
  planActual: Plan | null;
  loading: boolean;
  error: string | null;

  fetchPlanes: () => Promise<void>;
  fetchPlanesArchivados: () => Promise<void>;
  fetchPlanPorId: (id: number) => Promise<void>;
  crearPlan: (dto: createPlanDto) => Promise<void>;
  actualizarPlan: (id: number, dto: updatePlanDto) => Promise<void>;
  eliminarPlan: (id: number) => Promise<void>;
  restaurarPlan: (id: number) => Promise<void>;
  limpiarPlanActual: () => void;
}

export const usePlanStore = create<PlanState>((set, get) => ({
  planes: [],
  planesArchivados: [],
  planActual: null,
  loading: false,
  error: null,

  fetchPlanes: async () => {
    set({ loading: true, error: null });
    try {
      const planes = await planApi.getAll();
      set({ planes, loading: false });
    } catch (error) {
      set({ error: 'error al cargar planes', loading: false });
    }
  },

  fetchPlanesArchivados: async () => {
    set({ loading: true, error: null });
    try {
      const planesArchivados = await planApi.getArchivados();
      set({ planesArchivados, loading: false });
    } catch (error) {
      set({ error: 'error al cargar los planes archivados', loading: false });
    }
  },

  fetchPlanPorId: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const plan = await planApi.getOne(id);
      set({ planActual: plan, loading: false });
    } catch (error) {
      set({ error: 'error al cargar el plan', loading: false });
    }
  },

  crearPlan: async (dto: createPlanDto) => {
    set({ loading: true, error: null });
    try {
      const nuevoPlan = await planApi.create(dto);
      set({ planes: [...get().planes, nuevoPlan], loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  actualizarPlan: async (id: number, dto: updatePlanDto) => {
    set({ loading: true, error: null });
    try {
      const planActualizado = await planApi.update(id, dto);
      set({
        planes: get().planes.map((p) => (p.id === id ? planActualizado : p)),
        planesArchivados: get().planesArchivados.map((p) =>
          p.id === id ? planActualizado : p,
        ),
        planActual: planActualizado,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  eliminarPlan: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await planApi.remove(id);
      set({
        planes: get().planes.filter((p) => p.id !== id),
        loading: false,
      });
    } catch (error) {
      set({ error: 'error al eliminar el plan', loading: false });
      throw error;
    }
  },

  restaurarPlan: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const planRestaurado = await planApi.restore(id);
      set({
        planes: [planRestaurado, ...get().planes],
        planesArchivados: get().planesArchivados.filter((p) => p.id !== id),
        loading: false,
      });
    } catch (error) {
      set({ error: 'error al desarchivar el plan', loading: false });
      throw error;
    }
  },

  limpiarPlanActual: () => set({ planActual: null }),
}));
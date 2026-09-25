import { create } from "zustand";
import { presupuestoApi } from "./presupuesto.api";
import type { Presupuesto,createPresupuestoDto } from "./presupuesto.types";

interface presupuestoState {
    presupuestos:Presupuesto[];
    presupuestosArchivados:Presupuesto[];
    presupuestoActual:Presupuesto | null;
    loading:boolean;
    error:string | null;

    fetchPresupuesto: () => Promise<void>;
    fetchPresupuestosArchivados: () => Promise<void>;
    fetchPresupuestoPorId: (id:number) => Promise<void>;
    crearPresupuesto: (dto:createPresupuestoDto) => Promise<void>;
    eliminarPresupuesto: (id:number) => Promise<void>;
    restaurarPresupuesto: (id:number) => Promise<void>;
    limpiarPresupuestoActual: () => void;
}

export const usePresupuestoStore = create<presupuestoState>((set,get) => ({
    presupuestos: [],
    presupuestosArchivados: [],
    presupuestoActual: null,
    loading: false,
    error: null,
    
    fetchPresupuesto: async() => {
        set({loading:true,error:null})
        try{
            const presupuestos = await presupuestoApi.getAll();
            set({presupuestos,loading:false});
        } catch (error) {
            set({error:'error al cargar los presupuestos',loading:false});
        }
    },

    fetchPresupuestosArchivados: async() => {
        set({loading:true,error:null});
        try {
            const presupuestosArchivados = await presupuestoApi.getArchivados();
            set({presupuestosArchivados,loading:false});
        } catch (error) {
            set({error:'error al cargar los presupuestos archivados',loading:false});
        }
    },

    fetchPresupuestoPorId: async(id:number) => {
        set({loading:true,error:null});
        try{
            const presupuesto = await presupuestoApi.getOne(id);
            set({presupuestoActual:presupuesto,loading:false});
        } catch (error) {
            set({error:'error al cargar el presupuesto',loading:false});
        }
    },

    crearPresupuesto: async(dto:createPresupuestoDto) => {
        set({loading:true,error:null});
        try{
            const nuevoPresupuesto = await presupuestoApi.create(dto);
            set({
                presupuestos: [...get().presupuestos,nuevoPresupuesto],
                loading:false,
            });
        } catch (error) {
            set({error:'error al crear el presupuesto',loading:false});
            throw error;
        }
    },

    eliminarPresupuesto: async(id:number) => {
        set({loading:true,error:null});
        try {
            await presupuestoApi.remove(id);
            set({
                presupuestos: [...get().presupuestos.filter((p) => p.id !== id)],
                presupuestosArchivados: [...get().presupuestosArchivados.filter((p) => p.id !== id)],
                loading:false,
            });
        } catch (error) {
            set({error:'error al eliminar el presupuesto',loading:false});
            throw error;
        }
    },

    restaurarPresupuesto: async(id:number) => {
        set({loading:true,error:null});
        try {
            const presupuestoRestaurado = await presupuestoApi.restore(id);
            set({
                presupuestos:[presupuestoRestaurado, ...get().presupuestos],
                presupuestosArchivados:get().presupuestosArchivados.filter((p) => p.id !== id),
                loading:false,
            });
        } catch (error) {
            set({error:'error al restaurar el presupuesto',loading:false});
            throw error;
        }
    },

    limpiarPresupuestoActual: () => set({presupuestoActual:null}),
}));
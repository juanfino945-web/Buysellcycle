import { create } from "zustand";
import { sucursalApi } from "./sucursal.Api";
import type { Sucursal,createSucursalDto,updateSucursalDto } from "./sucursal.types";

interface sucursalState {
    sucursales:Sucursal[];
    sucursalesArchivadas:Sucursal[];
    sucursalActual:Sucursal | null;
    loading:boolean;
    error:string | null;

    fetchSucursal: () => Promise<void>;
    fetchSucursalesArchivadas: () => Promise<void>;
    fetchSucursalPorId: (id:number) => Promise<void>;
    crearSucursal: (dto:createSucursalDto) => Promise<void>;
    actualizarSucursal: (id:number,dto:updateSucursalDto) => Promise<void>;
    eliminarSucursal: (id:number) => Promise<void>;
    restaurarSucursal: (id:number) => Promise<void>;
    limpiarSucursalActual: () => void;
}

export const useSucursalStore = create<sucursalState>((set,get) => ({
    sucursales:[],
    sucursalesArchivadas:[],
    sucursalActual:null,
    loading:false,
    error:null,

    fetchSucursal: async() => {
        set({loading:true,error:null});
        try {
            const sucursales = await sucursalApi.getAll();
            set({sucursales,loading:false});
        } catch (error) {
            set({error:'error al cargar las sucursales',loading:false});
        }
    },

    fetchSucursalesArchivadas: async() => {
        set({loading:true,error:null});
        try {
            const sucursalesArchivadas = await sucursalApi.getArchivadas();
            set({sucursalesArchivadas,loading:false});
        } catch (error) {
            set({error:'error al cargar las sucursales archivadas',loading:false});
        }
    },

    fetchSucursalPorId: async(id:number) => {
        set({loading:true,error:null});
        try {
        const sucursal = await sucursalApi.getOne(id);
        set({sucursalActual:sucursal,loading:false});
        } catch (error) {
            set({error:'error al cargar la sucursal',loading:false});
        }
    },

    crearSucursal: async(dto:createSucursalDto) => {
        set({loading:true,error:null});
        try {
        const crearSucursal = await sucursalApi.create(dto);
        set({
            sucursales: [...get().sucursales,crearSucursal],loading:false
        });
        } catch (error) {
            set({error:'error al crear la sucursal',loading:false});
            throw error;
        }
    },

    actualizarSucursal: async(id:number,dto:updateSucursalDto) => {
        set({loading:true,error:null});
        try {
            const actualizarSucursal = await sucursalApi.update(id,dto);
            set({
                sucursales: [...get().sucursales.map((s) => s.id === id ? actualizarSucursal : s)],
                sucursalesArchivadas: [...get().sucursalesArchivadas.map((s) => s.id === id ? actualizarSucursal : s)],
                sucursalActual: actualizarSucursal,
                loading:false,
            });
        } catch (error) {
            set({error:'error al actualizar la sucursal',loading:false});
            throw error;
        }
    },

    eliminarSucursal: async(id:number) => {
        set({loading:true,error:null});
        try {
            await sucursalApi.remove(id);
            set({
                sucursales: [...get().sucursales.filter((s) => s.id !== id)],
                sucursalesArchivadas: [...get().sucursalesArchivadas.filter((s) => s.id !== id)],
                loading:false
            });
        } catch (error) {
            set({error:'error al eliminar sucursal',loading:false});
            throw error
        }
    },

    restaurarSucursal: async(id:number) => {
        set({loading:true,error:null});
        try {
            const sucursalRestaurada = await sucursalApi.restore(id);
            set({
                sucursales:[sucursalRestaurada, ...get().sucursales],
                sucursalesArchivadas:get().sucursalesArchivadas.filter((s) => s.id !== id),
                loading:false,
            });
        } catch (error) {
            set({error:'error al restaurar la sucursal',loading:false});
            throw error;
        }
    },

    limpiarSucursalActual: () => set({sucursalActual:null}),
}));
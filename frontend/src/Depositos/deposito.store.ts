import { create } from "zustand";
import { depositoApi } from "./deposito.Api";
import type { Deposito,createDepositoDto,updateDepositoDto } from "./deposito.types";

interface despositoState {
    depositos: Deposito[];
    depositosArchivados: Deposito[];
    depositoActual: Deposito | null;
    loading: boolean;
    error: string | null;
    
    fetchDeposito: () => Promise<void>;
    fetchDepositosArchivados: () => Promise<void>;
    fetchDepositoPorId: (id:number) => Promise<void>;
    crearDeposito: (dto:createDepositoDto) => Promise<void>;
    actualizarDeposito: (id:number,dto:updateDepositoDto) => Promise<void>;
    eliminarDeposito: (id:number) => Promise<void>;
    restaurarDeposito: (id:number) => Promise<void>;
    limpiarDepositoActual: () => void;
}

export const useDepositoStore = create<despositoState> ((set,get) => ({
    depositos: [],
    depositosArchivados: [],
    depositoActual: null,
    loading: false,
    error: null,

    fetchDeposito: async() => {
        set({loading:true,error:null});
        try {
            const depositos = await depositoApi.getAll();
            set({depositos,loading:false});
        } catch (error) {
            set({error:'error al cargar los depositos',loading:false});
        }
    },

    fetchDepositosArchivados: async() => {
        set({loading:true,error:null});
        try {
            const depositosArchivados = await depositoApi.getArchivadas();
            set({depositosArchivados,loading:false});
        } catch (error) {
            set({error:'error al cargar los depositos archivados',loading:false});
        }
    },

    fetchDepositoPorId: async(id:number) => {
        set({loading:true,error:null});
        try {
            const deposito = await depositoApi.getOne(id);
            set({depositoActual:deposito,loading:false});
        } catch (error) {
            set({error:'error al cargar el deposito',loading:false});
        }
    },

    crearDeposito: async(dto:createDepositoDto) => {
        set({loading:true,error:null});
        try {
            const nuevoDeposito = await depositoApi.create(dto);
            set({
                depositos: [...get().depositos,nuevoDeposito],loading:false
            });
        } catch (error) {
            set({error:'error al crear el deposito',loading:false});
            throw error;
        }
    },

    actualizarDeposito: async(id:number,dto:updateDepositoDto) => {
        set({loading:true,error:null});
        try {
            const actualizarDeposito = await depositoApi.update(id,dto);
            set({
                depositos:get().depositos.map((d) => d.id === id ? actualizarDeposito:d),
                depositosArchivados:get().depositosArchivados.map((d) => d.id === id ? actualizarDeposito:d),
                depositoActual:actualizarDeposito,
                loading:false,
            });
        } catch (error) {
            set({error:'error al actualizar el producto',loading:false});
            throw error;
        }
    },

    eliminarDeposito: async(id:number) => {
        set({loading:true,error:null});
        try {
            await depositoApi.remove(id);
            set({
                depositos:get().depositos.filter((d) => d.id !== id),
                depositosArchivados:get().depositosArchivados.filter((d) => d.id !== id),
                loading:false
            });
        } catch (error) {
            set({error:'error al eliminar',loading:false});
            throw error;
        }
    },

    restaurarDeposito: async(id:number) => {
        set({loading:true,error:null});
        try {
            const depositoRestaurado = await depositoApi.restore(id);
            set({
                depositos:[depositoRestaurado, ...get().depositos],
                depositosArchivados:get().depositosArchivados.filter((d) => d.id !== id),
                loading:false,
            });
        } catch (error) {
            set({error:'error al restaurar el deposito',loading:false});
            throw error;
        }
    },

    limpiarDepositoActual: () => set({depositoActual:null}),
}));
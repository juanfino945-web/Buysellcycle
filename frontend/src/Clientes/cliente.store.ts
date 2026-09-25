import { create } from "zustand";
import { clienteApi } from "./clientes.Api";
import type { Cliente,createClienteDto,updateCLienteDto } from "./clientes.types";

interface clienteState {
    clientes: Cliente[];
    clientesArchivados: Cliente[];
    clienteActual: Cliente | null;
    loading:boolean;
    error: string | null;

    fetchClientes: () => Promise<void>;
    fetchClientesArchivados: () => Promise<void>;
    fetchClientesPorId: (id:number) => Promise<void>;
    crearCliente: (dto:createClienteDto) => Promise<void>;
    actualizarCliente: (id:number,dto:updateCLienteDto) => Promise<void>;
    eliminarCliente: (id:number) => Promise<void>;
    restaurarCliente: (id:number) => Promise<void>;
    limpiarClienteActual: () => void;
}

export const useClienteStore=create<clienteState>((set,get) => ({
    clientes: [],
    clientesArchivados: [],
    clienteActual: null,
    loading: false,
    error: null,

    fetchClientes: async() => {
        set({loading:true,error:null});
        try {
            const clientes = await clienteApi.getAll();
            set({clientes,loading:false});
        } catch (error) {
            set({error:'error al cargar los clientes',loading:false});
        }
    },

    fetchClientesArchivados: async() => {
        set({loading:true,error:null});
        try {
            const clientesArchivados = await clienteApi.getArchivadas();
            set({clientesArchivados,loading:false});
        } catch (error) {
            set({error:'error al cargar los clientes archivados',loading:false});
        }
    },

    fetchClientesPorId: async(id:number) => {
        set({loading:true,error:null});
        try{
            const cliente = await clienteApi.getOne(id);
            set({clienteActual:cliente,loading:false});
        } catch (error) {
            set({error:'error al cargar el cliente',loading:false});
        }
    },

    crearCliente: async(Dto:createClienteDto) => {
        set({loading:true,error:null});
        try {
            const nuevoCliente = await clienteApi.create(Dto);
            set({clientes: [...get().clientes,nuevoCliente],loading:false});
        } catch(error) {
            set({error:'error al crear el cliente',loading:false});
            throw error;
        }
    },

    actualizarCliente: async(id:number,dto:updateCLienteDto) => {
        set({loading:true,error:null});
        try{
            const clienteActualizado = await clienteApi.update(id,dto);
            set({
                clientes: get().clientes.map((c) => c.id === id ? clienteActualizado : c),
                clientesArchivados: get().clientesArchivados.map((c) => c.id === id ? clienteActualizado : c),
                clienteActual: clienteActualizado,
                loading:false,
        });
        } catch(error) {
            set({error:'error al actualizar el cliente',loading:false});
            throw error;
        }
    },

    eliminarCliente: async(id:number) => {
        set({loading:true,error:null});
        try {
             await clienteApi.remove(id);
             set({
                clientes:get().clientes.filter((c) => c.id !== id),
                clientesArchivados:get().clientesArchivados.filter((c) => c.id !== id),
                loading:false
            });
        } catch(error) {
            set({error:'error al eliminar cliente'});
        }
    },

    restaurarCliente: async(id:number) => {
        set({loading:true,error:null});
        try {
            const clienteRestaurado = await clienteApi.restore(id);
            set({
                clientes:[clienteRestaurado, ...get().clientes],
                clientesArchivados: get().clientesArchivados.filter((c) => c.id !== id),
                loading:false,
            });
        } catch (error) {
            set({error:'error al restaurar el cliente',loading:false});
            throw error;
        }
    },

    limpiarClienteActual: () => set({ clienteActual: null }),
}));

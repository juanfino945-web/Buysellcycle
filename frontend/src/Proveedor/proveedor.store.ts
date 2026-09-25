import { create } from "zustand";
import { proveedorApi } from "./proveedor.Api";
import type { Proveedor,createProveedorDto,updateProveedorDto } from "./proveedor.types";

export interface proveedorState {
    proveedores: Proveedor[];
    proveedoresArchivados: Proveedor[];
    proveedorActual: Proveedor | null;
    loading:boolean;
    error:string | null;

    fetchProveedor: () => Promise<void>;
    fetchProveedoresArchivados: () => Promise<void>;
    fetchProveedorPorId: (Id:number) => Promise<void>;
    crearProveedor: (dto:createProveedorDto) => Promise<void>;
    actualizarProveedor: (id:number,dto:updateProveedorDto) => Promise<void>;
    eliminarProveedor: (id:number) => Promise<void>;
    restaurarProveedor: (id:number) => Promise<void>;
    limpiarProveedorActual: () => void;
}

export const useProveedorStore = create<proveedorState>((set,get) => ({
    proveedores:[],
    proveedoresArchivados:[],
    proveedorActual:null,
    loading:false,
    error:null,

    fetchProveedor: async() => {
        set({loading:true,error:null});
        try {
            const proveedores = await proveedorApi.getAll();
            set({proveedores,loading:false});
        } catch (error) {
            set({error:'error al cargar los proveedores',loading:false});
        }
    },

    fetchProveedoresArchivados: async() => {
        set({loading:true,error:null});
        try {
            const proveedoresArchivados = await proveedorApi.getArchivados();
            set({proveedoresArchivados,loading:false});
        } catch (error) {
            set({error:'error al cargar los proveedores archivados',loading:false});
        }
    },

    fetchProveedorPorId: async(id:number) => {
        set({loading:true,error:null});
        try {
            const proveedor = await proveedorApi.getOne(id);
            set({proveedorActual:proveedor,loading:false});
        } catch (error) {
            set({error:'error al cargar el proveedor',loading:false});
        }
    },

    crearProveedor: async(dto:createProveedorDto) => {
        set({loading:true,error:null});
        try {
            const nuevoProveedor = await proveedorApi.create(dto);
            set({proveedores: [...get().proveedores,nuevoProveedor],loading:false});
        } catch (error) {
            set({error:'error al crear el proveedor',loading:false});
            throw error;
        }
    },

      actualizarProveedor: async (id: number, dto: updateProveedorDto) => {
    set({ loading: true, error: null });
    try {
      const actualizarProveedor = await proveedorApi.update(id, dto);
      set({
        proveedores: get().proveedores.map((p) => (p.id === id ? actualizarProveedor : p)),
        proveedoresArchivados: get().proveedoresArchivados.map((p) => (p.id === id ? actualizarProveedor : p)),
        proveedorActual: actualizarProveedor,
        loading: false,
      });
    } catch (error) {
      set({ error: 'error al actualizar el proveedor.', loading: false });
      throw error;
    }
  },

    eliminarProveedor: async(id:number) => {
        set({loading:true,error:null});
        try {
            await proveedorApi.remove(id);
            set({
                proveedores:get().proveedores.filter((p) => p.id !== id),
                proveedoresArchivados:get().proveedoresArchivados.filter((p) => p.id !== id),
                loading:false,
            });
        } catch (error) {
            set({error:'error al eliminar el proveedor',loading:false});
            throw error;
        }
    },

    restaurarProveedor: async(id:number) => {
        set({loading:true,error:null});
        try {
            const proveedorRestaurado = await proveedorApi.restore(id);
            set({
                proveedores:[proveedorRestaurado, ...get().proveedores],
                proveedoresArchivados:get().proveedoresArchivados.filter((p) => p.id !== id),
                loading:false,
            });
        } catch (error) {
            set({error:'error al restaurar el proveedor',loading:false});
            throw error;
        }
    },

    limpiarProveedorActual: () => set({proveedorActual:null}),
}));
import { create } from "zustand";
import { categoriaNivel2Api } from "./categoria-nivel2.api";
import type { CategoriaNivel2,createCategoriaNivel2Dto,updateCategoriaNivel2Dto } from "./categoria-nivel2.types";

interface categoriaNivel2State {
    categorias: CategoriaNivel2[],
    categoriasArchivadas: CategoriaNivel2[],
    categoriaActual: CategoriaNivel2 | null,
    loading: boolean,
    error: string | null,

    fetchCategorias: () => Promise<void>;
    fetchCategoriasArchivadas: () => Promise<void>;
    fetchCategoriasPorId: (id:number) => Promise<void>;
    crearCategoria: (dto:createCategoriaNivel2Dto) => Promise<void>;
    actualizarCategoria: (id:number,dto:updateCategoriaNivel2Dto) => Promise<void>;
    eliminarCategoria: (id:number) => Promise<void>;
    restaurarCategoria: (id:number) => Promise<void>;
    limpiarCategoria: () => void;
}

export const useCategeoriaNivel2Store = create<categoriaNivel2State>((set,get) => ({
    categorias: [],
    categoriasArchivadas: [],
    categoriaActual: null,
    loading: false,
    error: null,

    fetchCategorias: async() => {
        set({loading:true,error:null});
        try {
            const categorias = await categoriaNivel2Api.getAll();
            set({categorias, loading: false});
        } catch (error) {
            set({error: 'error al cargar las categorias',loading:false});
        }

    },

    fetchCategoriasArchivadas: async() => {
        set({loading:true,error:null});
        try {
            const categoriasArchivadas = await categoriaNivel2Api.getArchivadas();
            set({categoriasArchivadas, loading:false});
        } catch (error) {
            set({error: 'error al cargar las categorias archivadas', loading:false});
        }
    },

    fetchCategoriasPorId: async(id:number) => {
        set({loading:true,error:null});
        try {
            const categoria = await categoriaNivel2Api.getOne(id);
            set({categoriaActual: categoria, loading:false});
        } catch (error) {
            set({error: 'error al cargar la categoria',loading:false});
        }
    },

    crearCategoria: async(dto:createCategoriaNivel2Dto) => {
        set({loading:true,error:null});
        try {
            const nuevaCategoria = await categoriaNivel2Api.create(dto);
            set({categorias: [...get().categorias,nuevaCategoria],loading:false});
        } catch (error) {
            set({error: 'error al crear la categoria', loading:false});
            throw error;
        }
    },

    actualizarCategoria: async(id:number,dto:updateCategoriaNivel2Dto) => {
        set({loading:true,error:null});
        try {
            const actualizarCategoria = await categoriaNivel2Api.update(id,dto);
            set({
                categorias:get().categorias.map((c) => (c.id === id ? actualizarCategoria : c)),
                categoriasArchivadas:get().categoriasArchivadas.map((c) => (c.id === id ? actualizarCategoria : c)),
                categoriaActual: actualizarCategoria,
                loading:false,
            });
        } catch (error) {
            set({error: 'error al actualizar la categoria',loading:false});
            throw error;
        }
    },

    eliminarCategoria: async(id:number) => {
        set({loading:true,error:null});
        try {
            await categoriaNivel2Api.remove(id);
            set({
                categorias:get().categorias.filter((c) => (c.id !== id)),
                categoriasArchivadas:get().categoriasArchivadas.filter((c) => c.id !== id),
                loading:false,
            });
        } catch (error) {
            set({error: 'error al eliminar la categoria',loading:false});
            throw error;
        }
    },

    restaurarCategoria: async(id:number) => {
        set({loading:true,error:null});
        try {
            const categoriaRestaurada = await categoriaNivel2Api.restore(id);
            set({
                categorias:[categoriaRestaurada, ...get().categorias],
                categoriasArchivadas:get().categoriasArchivadas.filter((c) => c.id !== id),
                loading:false,
            });
        } catch (error) {
            set({error: 'error al restaurar la categoria',loading:false});
            throw error;
        }
    },

    limpiarCategoria: () => set({categoriaActual:null})
}));
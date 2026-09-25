import { create } from "zustand";
import { categoriaNivel1Api } from "./categoria-nivel1.api"; 
import type { CategoriaNivel1, createCategoriaNivel1Dto, updateCategoriaNvel1Dto} from './categoria-nivel1.types';

interface categoriaNivel1State {
    categorias: CategoriaNivel1[],
    categoriasArchivadas: CategoriaNivel1[],
    categoriaActual: CategoriaNivel1 | null,
    loading: boolean,
    error: string | null,

    fetchCategorias: () => Promise<void>;
    fetchCategoriasArchivadas: () => Promise<void>;
    fetchCategoriaPorId: (id:number) => Promise<void>;
    crearCategoria: (dto:createCategoriaNivel1Dto) => Promise<void>;
    actualizarCategoria: (id:number, dto:updateCategoriaNvel1Dto) => Promise<void>;
    eliminarCategoria: (id:number) => Promise<void>;
    restaurarCategoria: (id:number) => Promise<void>;
    limpiarCategoriaActual: () => void; 
}

export const useCategoriaNivel1Store = create<categoriaNivel1State>((set,get) => ({
    categorias: [],
    categoriasArchivadas: [],
    categoriaActual: null,
    loading: false,
    error: null,

    fetchCategorias: async () => {
        set({loading:true, error:null});
        try {
            const categorias = await categoriaNivel1Api.getAll();
            set({categorias, loading:false});
        } catch (error) {
            set({error: 'error al cargar las categorias', loading:false});
        }
    },

    fetchCategoriasArchivadas: async () => {
        set({loading:true, error:null});
        try {
            const categoriasArchivadas = await categoriaNivel1Api.getArchivadas();
            set({categoriasArchivadas, loading:false});
        } catch (error) {
            set({error: 'error al cargar las categorias archivadas', loading:false});
        }
    },

    fetchCategoriaPorId: async (id:number) => {
        set({loading:true, error:null});
        try {
            const categoria = await categoriaNivel1Api.getOne(id);
            set({categoriaActual:categoria, loading:false});
        } catch (error){
            set({error: 'error al cargar la categoria', loading:false});
        }
    },

    crearCategoria: async (dto:createCategoriaNivel1Dto) => {
        set({loading:true, error:null});
        try {
            const nuevaCategoria= await categoriaNivel1Api.create(dto);
            set({categorias: [...get().categorias,nuevaCategoria], loading:false});
        } catch (error) {
            set({error: 'error al crear categoria', loading:false});
            throw error;
        }
    },

    actualizarCategoria: async(id:number, dto:updateCategoriaNvel1Dto) => {
        set({loading:true,error:null});
        try {
            const actualizarCategoria = await categoriaNivel1Api.update(id,dto);
            set({
                categorias: get().categorias.map((c) => (c.id === id ? actualizarCategoria : c)),
                categoriasArchivadas: get().categoriasArchivadas.map((c) => (c.id === id ? actualizarCategoria : c)),
                categoriaActual: actualizarCategoria,
                loading: false,   
            });
        } catch (error) {
            set({error: 'no se pudo actualizar la categoria', loading:false});
            throw error;
        }
    },

    eliminarCategoria: async(id:number) => {
        set({loading:true,error:null});
        try {
            await categoriaNivel1Api.remove(id);
            set({
                categorias: get().categorias.filter((c) => c.id !== id),
                categoriasArchivadas: get().categoriasArchivadas.filter((c) => c.id !== id),
                loading:false,
            });
        } catch (error) {
            set({error: 'no se pudo eliminar la categoria'});
            throw error;
        }
    },

    restaurarCategoria: async(id:number) => {
        set({loading:true,error:null});
        try {
            const categoriaRestaurada = await categoriaNivel1Api.restore(id);
            set({
                categorias: [categoriaRestaurada, ...get().categorias],
                categoriasArchivadas: get().categoriasArchivadas.filter((c) => c.id !== id),
                loading:false,
            });
        } catch (error) {
            set({error: 'no se pudo restaurar la categoria', loading:false});
            throw error;
        }
    },

    limpiarCategoriaActual: () => set({categoriaActual:null}),
 }));

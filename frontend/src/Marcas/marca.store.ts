import {create} from 'zustand';
import {marcaApi} from './marca.Api';
import type {Marca, createMarcaDto, updateMarcaDto} from './marca.types';

interface marcaState {
    marcas: Marca[];
    marcasArchivadas: Marca[];
    marcaActual: Marca | null;
    loading: boolean;
    error: string | null;

    fetchMarcas: () => Promise<void>;
    fetchMarcasArchivadas: () => Promise<void>;
    fetchMarcasPorId: (id: number) => Promise<void>;
    crearMarca: (dto: createMarcaDto) => Promise<void>;
    actualizarMarca: (id:number, dto: updateMarcaDto) => Promise<void>;
    eliminarMarca: (id:number) => Promise<void>;
    restaurarMarca: (id:number) => Promise<void>;
    limpiarMarcaActual: () => void;
}

export const useMarcaStore = create<marcaState>((set,get) => ({
    marcas: [],
    marcasArchivadas: [],
    marcaActual: null,
    loading: false,
    error: null,

    fetchMarcas: async () => {
        set({loading: true, error: null});
        try {
            const marcas = await marcaApi.getAll();
            set({marcas, loading: false});
        } catch (error) {
            set({error: 'error al cargar marca', loading: false});
        }
    },

    fetchMarcasArchivadas: async () => {
        set({loading: true, error: null});
        try {
            const marcasArchivadas = await marcaApi.getArchivadas();
            set({marcasArchivadas, loading: false});
        } catch (error) {
            set({error: 'error al cargar las marcas archivadas', loading: false});
        }
    },

    fetchMarcasPorId: async (id:number) => {
        set({loading: true, error: null});
        try {
            const marca = await marcaApi.getOne(id);
            set({marcaActual: marca, loading: false});
        } catch (error) {
            set({error: 'error al cargar la marca', loading: false});
        }
    },

    crearMarca: async (dto:createMarcaDto) => {
        set({loading: true, error: null});
        try {
            const nuevaMarca = await marcaApi.create(dto);
            set({marcas: [...get().marcas, nuevaMarca], loading: false});
        } catch (error) {
            set({error: 'error al crear la marca', loading: false});
            throw error;
        }
    },

    actualizarMarca: async (id:number, dto:updateMarcaDto) => {
        set({loading: true, error: null});
        try {
            const marcaActualizada = await marcaApi.update(id, dto);
            set({
                marcas: get().marcas.map((m) => m.id === id ? marcaActualizada : m),
                marcasArchivadas: get().marcasArchivadas.map((m) => m.id === id ? marcaActualizada : m),
                marcaActual: marcaActualizada,
                loading: false,
            });
            }catch (error) {
                set({error: 'error al actualizar la marca', loading: false});
                throw error;
            }
    },

    eliminarMarca: async (id:number) => {
        set({loading: true, error: null});
        try {
            await marcaApi.remove(id);
            set({
                marcas: get().marcas.filter((m) => m.id !== id),
                marcasArchivadas: [...get().marcasArchivadas.filter((m) => m.id !== id)],
                loading: false,
            });
        } catch (error) {
            set({error: 'error al eliminar la marca', loading: false});
            throw error;
        }
    },

    restaurarMarca: async (id:number) => {
        set({loading: true, error: null});
        try {
            const marcaRestaurada = await marcaApi.restore(id);
            set({
                marcas: [marcaRestaurada, ...get().marcas],
                marcasArchivadas: get().marcasArchivadas.filter((m) => m.id !== id),
                loading: false,
            });
        } catch (error) {
            set({error: 'error al desarchivar la marca', loading: false});
            throw error;
        }
    },

    limpiarMarcaActual: () => set({marcaActual: null}),

}));
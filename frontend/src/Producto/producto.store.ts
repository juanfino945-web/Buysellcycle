import { create } from 'zustand';
import { productoApi } from './producto.api';
import type {Producto,CreateProductoDto,UpdateProductoDto,} from './producto.types';

interface productoState {
  productos: Producto[];
  productosArchivados: Producto[];
  productoActual: Producto | null;
  loading: boolean;
  error: string | null;

  fetchProductos: () => Promise<void>;
  fetchProductosArchivados: () => Promise<void>;
  fetchProductoPorId: (id: number) => Promise<void>;
  crearProducto: (dto: CreateProductoDto) => Promise<void>;
  actualizarProducto: (id: number, dto: UpdateProductoDto) => Promise<void>;
  eliminarProducto: (id: number) => Promise<void>;
  restaurarProducto: (id: number) => Promise<void>;
  limpiarProductoActual: () => void;
}

export const useProductoStore = create<productoState>((set, get) => ({
  productos: [],
  productosArchivados: [],
  productoActual: null,
  loading: false,
  error: null,

  fetchProductos: async () => {
    set({ loading: true, error: null });
    try {
      const productos = await productoApi.getAll();
      set({ productos, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar los productos.', loading: false });
    }
  },

  fetchProductosArchivados: async () => {
    set({ loading: true, error: null });
    try {
      const productosArchivados = await productoApi.getArchivados();
      set({ productosArchivados, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar los productos archivados.', loading: false });
    }
  },

  fetchProductoPorId: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const producto = await productoApi.getOne(id);
      set({ productoActual: producto, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar el producto.', loading: false });
    }
  },

  crearProducto: async (dto: CreateProductoDto) => {
    set({ loading: true, error: null });
    try {
      const nuevoProducto = await productoApi.create(dto);
      set({ productos: [...get().productos, nuevoProducto], loading: false });
    } catch (error) {
      set({ error: 'Error al crear el producto.', loading: false });
      throw error;
    }
  },

  actualizarProducto: async (id: number, dto: UpdateProductoDto) => {
    set({ loading: true, error: null });
    try {
      const actualizadoProducto = await productoApi.update(id, dto);
      set({
        productos: get().productos.map((p) => (p.id === id ? actualizadoProducto : p)),
        productosArchivados: get().productosArchivados.map((p) => (p.id === id ? actualizadoProducto : p)),
        productoActual: actualizadoProducto,
        loading: false,
      });
    } catch (error) {
      set({ error: 'Error al actualizar el producto.', loading: false });
      throw error;
    }
  },

  eliminarProducto: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await productoApi.remove(id);
      set({
        productos: get().productos.filter((p) => p.id !== id),
        productosArchivados: get().productosArchivados.filter((p) => p.id !== id),
        loading: false,
      });
    } catch (error) {
      set({ error: 'Error al eliminar el producto.', loading: false });
      throw error;
    }
  },

  restaurarProducto: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const productoRestaurado = await productoApi.restore(id);
      set({
        productos: [productoRestaurado, ...get().productos],
        productosArchivados: get().productosArchivados.filter((p) => p.id !== id),
        loading: false,
      });
    } catch (error) {
      set({ error: 'Error al restaurar el producto.', loading: false });
      throw error;
    }
  },

  limpiarProductoActual: () => set({ productoActual: null }),
}));
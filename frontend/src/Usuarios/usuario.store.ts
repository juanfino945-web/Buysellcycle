import { create } from "zustand";
import { usuarioApi } from "./usuario.Api";
import type { Usuario,createUsuarioDto,updateUsuarioDto } from "./usuario.types";

interface usuarioState {
    usuarios: Usuario[];
    usuariosArchivados: Usuario[];
    usuarioActual: Usuario |  null;
    loading: boolean;
    error: string | null;

    fetchUsuarios: () => Promise<void>;
    fetchUsuariosArchivados: () => Promise<void>;
    fetchUsuarioPorId: (id:number) => Promise<void>;
    crearUsuario: (dto:createUsuarioDto) => Promise<void>;
    actualizarUsuario: (id:number,dto:updateUsuarioDto) => Promise<void>;
    eliminarUsuario: (id:number) => Promise<void>;
    restaurarUsuario: (id:number) => Promise<void>;
    limpiarUsuarioActual: () => void;
}

export const useUsuarioStore = create<usuarioState>((set,get) => ({
    usuarios: [],
    usuariosArchivados: [],
    usuarioActual: null,
    loading: false,
    error: null,

    fetchUsuarios: async() => {
        set({loading:true,error:null});
        try {
            const usuarios = await usuarioApi.getAll();
            set({usuarios,loading:false});
        } catch (error) {
            set({error:'error al cargar usuarios',loading:false});
        }
    },

    fetchUsuariosArchivados: async() => {
        set({loading:true,error:null});
        try {
            const usuariosArchivados = await usuarioApi.getArchivados();
            set({usuariosArchivados,loading:false});
        } catch (error) {
            set({error:'error al cargar usuarios archivados',loading:false});
        }
    },

    fetchUsuarioPorId: async(id:number) => {
        set({loading:true,error:null});
        try {
            const usuario = await usuarioApi.getOne(id);
            set({usuarioActual:usuario,loading:false});
        } catch (error) {
            set({error:'error al cargar el usuario',loading:false});
        }
    },

    crearUsuario: async(dto:createUsuarioDto) => {
        set({loading:true,error:null});
        try {
            const nuevoUsuario = await usuarioApi.create(dto);
            set({
                usuarios: [...get().usuarios,nuevoUsuario],loading:false
            });
        } catch (error) {
            set({error:'error al crear el usuario',loading:false});
            throw error;
        }
    },

    actualizarUsuario: async(id:number,dto:updateUsuarioDto) => {
        set({loading:true,error:null});
        try {
            const actualizarUsuario = await usuarioApi.update(id,dto);
            set({
                usuarios:get().usuarios.map((u) => u.id === id ? actualizarUsuario:u),
                usuariosArchivados:get().usuariosArchivados.map((u) => u.id === id ? actualizarUsuario:u),
                usuarioActual:actualizarUsuario,
                loading:false,
            });
        } catch (error) {
            set({error:'error al actualizar el usuario',loading:false});
            throw error;
        }
    },

    eliminarUsuario: async(id:number) => {
        set({loading:true,error:null});
        try {
            await usuarioApi.remove(id);
            set({
                usuarios:get().usuarios.filter((u) => u.id !== id),
                usuariosArchivados:get().usuariosArchivados.filter((u) => u.id !== id),
                loading:false,
            });
        } catch (error) {
            set({error:'error al eliminar el usuario',loading:false});
            throw error;
        }
    },

    restaurarUsuario: async(id:number) => {
        set({loading:true,error:null});
        try {
            const usuarioRestaurado = await usuarioApi.restore(id);
            set({
                usuarios:[usuarioRestaurado, ...get().usuarios],
                usuariosArchivados:get().usuariosArchivados.filter((u) => u.id !== id),
                loading:false,
            });
        } catch (error) {
            set({error:'error al restaurar el usuario',loading:false});
            throw error;
        }
    },

    limpiarUsuarioActual: () => set({usuarioActual:null}),
}));
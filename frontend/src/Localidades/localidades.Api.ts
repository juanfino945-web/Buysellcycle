import api from "../api/axiosClient";
import type { Localidades } from "./localidades.types";

export const localidadesApi = {
    getAll: async():Promise<Localidades[]> => {
        const {data} = await api.get<Localidades[]>(`/localidad`);
        return data;
    },

    getByProvincia: async(id:number):Promise<Localidades[]> => {
        const {data} = await api.get<Localidades[]>(`/localidad?provinciaId=${id}`);
        return data;
    }
}
import api from "../api/axiosClient";
import type { Provincias } from "./provincias.types";

export const provinciasApi = {
    getAll: async(): Promise<Provincias[]> => {
        const {data} = await api.get<Provincias[]>(`/provincia`);
        return data
    }
};
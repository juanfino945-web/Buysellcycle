import api from "../api/axiosClient";
import type { StockActual,movimientoStockDto,transferenciaStockDto,movimientoStockResponse } from "./stock.types";

export const stockApi = {
    ingreso: async(dto:movimientoStockDto):Promise<movimientoStockResponse> => {
        const {data} = await api.post<movimientoStockResponse>(`/stock/ingreso`,dto);
        return data;
    },

    egreso: async(dto:movimientoStockDto):Promise<movimientoStockResponse> => {
        const {data} = await api.post<movimientoStockResponse>(`/stock/egreso`,dto);
        return data;
    },

    transferencia: async(dto:transferenciaStockDto):Promise<movimientoStockResponse> => {
        const {data} = await api.post<movimientoStockResponse>(`/stock/transferencia`,dto);
        return data;
    },

    getAll: async (): Promise<StockActual[]> => {
    const { data } = await api.get<StockActual[]>('/stock');
    return data;
},
};
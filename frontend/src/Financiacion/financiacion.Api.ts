import api from '../api/axiosClient';

export interface simularFinanciacionDto {
  monto: number;
  tarjetaId: number;
  bancoId: number;
  planId: number;
}

export interface simularFinanciacionResultado {
  montoTotal: number;
  montoCuota: number;
  cantidadCuotas: number;
  tasaFinanciacion: number;
}

export interface historialFinanciacion {
  id: number;
  monto: string;
  montoTotal: string;
  montoCuota: string;
  cantidadCuotas: number;
  tasaFinanciacion: string;
  fechaCreacion: string;
  tarjeta: { id: number; nombre: string };
  banco: { id: number; nombre: string };
}


export const financiacionApi = {
  simular: async (dto: simularFinanciacionDto): Promise<simularFinanciacionResultado> => {
    const { data } = await api.post<simularFinanciacionResultado>('/financiacion/simular', dto);
    return data;
  },

  getHistorial: async (): Promise<historialFinanciacion[]> => {
    const { data } = await api.get<historialFinanciacion[]>('/financiacion/historial');
    return data;
  },
};
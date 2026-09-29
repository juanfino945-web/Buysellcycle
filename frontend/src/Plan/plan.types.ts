import type { Tarjeta } from '../Tarjeta/tarjeta.types';
import type { Banco } from '../Banco/banco.types';

export interface Plan {
  id: number;
  tarjetaId: number;
  bancoId: number;
  cantidadCuotas: number;
  tasaFinanciacion: string;
  observaciones: string | null;
  archivado: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
  tarjeta?: Tarjeta;
  banco?: Banco;
}

export interface createPlanDto {
  tarjetaId: number;
  bancoId: number;
  cantidadCuotas: number;
  tasaFinanciacion: number;
  observaciones?: string;
}

export type updatePlanDto = Partial<createPlanDto>;
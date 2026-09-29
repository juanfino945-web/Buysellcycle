export type TipoTarjeta = 'CREDITO' | 'DEBITO';

export interface Tarjeta {
  id: number;
  nombre: string;
  tipo: TipoTarjeta;
  archivado: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface createTarjetaDto {
  nombre: string;
  tipo: TipoTarjeta;
}

export type updateTarjetaDto = Partial<createTarjetaDto>;
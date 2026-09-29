export interface Banco {
  id: number;
  nombre: string;
  archivado: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface createBancoDto {
  nombre: string;
}

export type updateBancoDto = Partial<createBancoDto>;
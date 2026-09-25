export interface Marca {
  id: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface createMarcaDto {
    nombre: string;
}

export type updateMarcaDto = Partial<createMarcaDto>;
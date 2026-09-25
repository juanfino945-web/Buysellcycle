export type EstadoProducto = 'DISPONIBLE' | 'ACTIVO' | 'INACTIVO';


export interface Producto {
  id: number;
  nombre: string;
  stockTotal: number;
  costoNeto: string; 
  utilidadPorcentaje: string;
  precioLista: string;
  descuentoContadoPorcentaje: string;
  precioContado: string;
  estado: EstadoProducto;
  fechaHoraUltimoMovimientoStock: string | null;
  fechaHoraUltimaSincronizacionStock: string | null;
  rutaImagenStorage: string | null;
  marcaId: number;
  categoriaNivel2Id: number;
  archivado: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
  marca?: { id: number; nombre: string };
  categoriaNivel2?: { id: number; nombre: string };
}


export interface CreateProductoDto {
  nombre: string;
  costoNeto: number;
  utilidadPorcentaje: number;
  descuentoContadoPorcentaje: number;
  marcaId: number;
  categoriaNivel2Id: number;
  rutaImagenStorage?: string;
}


export type UpdateProductoDto = Partial<CreateProductoDto>;
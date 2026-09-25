export interface movimientoStockDto {
    productoId:number;
    depositoId:number;
    cantidad:Number;
}

export interface transferenciaStockDto {
    productoId:number;
    depositoOrigenId:number;
    depositoDestinoId:number;
    cantidad:number;
}

export interface movimientoStockResponse {
    mensaje: string;
    productoId: number;
    depositoId?: number;
    depositoOrigenId?: number;
    depositoDestinoId?: number;
    stockDeposito?: number;
    stockTotal?: number;
    stockOrigenRestante?: number;
    stockDestinoActual?: number;
}

export interface StockActual {
  id: number;
  stock: number;
  ultimoMovimiento: string | null;
  fechaActualizacion: string;
  producto: { id: number; nombre: string };
  deposito: { id: number; nombre: string; codigo: string };
}
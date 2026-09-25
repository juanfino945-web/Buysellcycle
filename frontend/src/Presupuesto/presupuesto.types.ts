import type { Cliente } from "../Clientes/clientes.types";
import type { Producto } from "../Producto/producto.types";

export interface presupuestoItem {
    id:number;
    presupuestoId:number;
    productoId:number;
    cantidad:number;
    precioUnitario:string;
    subTotal:string;
    producto?:Producto;
}

export interface Presupuesto {
    id:number;
    fechaEmision:string;
    total:string;
    archivado:Boolean;
    fechaCreacion:string;
    fechaActualizacion:string;
    clienteId:number;
    cliente?:Cliente;
    items:presupuestoItem[];
}

export interface createPresupuestoItemDto {
    productoId:number;
    cantidad:number;
}

export interface createPresupuestoDto {
  clienteId: number;
  items: createPresupuestoItemDto[];
}
declare class PresupuestoItemDto {
    productoId: number;
    cantidad: number;
}
export declare class CreatePresupuestoDto {
    clienteId: number;
    items: PresupuestoItemDto[];
}
export {};

export interface Proveedor {
    id:number;
    razonSocial:string;
    cuit:string;
    archivado:boolean;
    fechaCreacion:string;
    fechaActualizacion:string;
}

export interface createProveedorDto {
    razonSocial:string;
    cuit:string;
}

export type updateProveedorDto = Partial<Proveedor>;
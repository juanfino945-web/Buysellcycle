export interface Sucursal {
    id:number;
    nombre:string;
    archivado:boolean;
    fechaCreacion:string;
    fechaActualizacion:string;
    provinciaId:number;
    localidadId:number;
    provincia?: {id:number; nombre:string};
    localidad?: {id:number; nombre:string};
}

export interface createSucursalDto {
    nombre:string;
    provinciaId:number;
    localidadId:number;
}

export type updateSucursalDto = Partial<createSucursalDto>;


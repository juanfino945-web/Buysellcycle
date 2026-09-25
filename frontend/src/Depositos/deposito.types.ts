export interface Deposito {
    id:number;
    codigo:string;
    nombre:string;
    fechaCreacion:string;
    fechaActualizacion:string;
    provinciaId:number;
    localidadId:number;
    provincia?: {id:number,nombre:string};
    localidad?: {id:number,nombre:string};
}

export interface createDepositoDto {
    nombre:string;
    provinciaId:number;
    localidadId:number;
}

export type updateDepositoDto = Partial<createDepositoDto>;
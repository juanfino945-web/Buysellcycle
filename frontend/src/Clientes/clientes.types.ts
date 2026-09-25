export interface Cliente {
    id:number;
    nombre:string;
    apellido:string;
    dni:string;
    email:string;
    archivado:boolean;
    fechaCreacion:string;
    fechaActualizacion:string;
    provinciaId:number;
    localidadId:number;
    provincia?: {id:number;nombre:string};
    localidad?: {id:number;nombre:string};
}

export interface createClienteDto {
    nombre:string;
    apellido:string;
    dni:string;
    email:string;
    provinciaId:number;
    localidadId:number;
}

export type updateCLienteDto = Partial<createClienteDto>;
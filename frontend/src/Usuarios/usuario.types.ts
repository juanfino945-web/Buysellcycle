export type rolUsuario = 'ADMINISTRADOR' | 'VENDEDOR';

export interface Usuario {
    id:number;
    nombre:string;
    apellido:string;
    dni:string;
    nombreUsuario:string;
    rol:rolUsuario;
    archivado:boolean;
    fechaCreacion:string;
    fechaActualizacion:string;
    sucursalId:number;
    sucursal?: {id:number,nombre:string};
}

export interface createUsuarioDto {
    nombre:string;
    apellido:string;
    dni:string;
    nombreUsuario:string;
    rol:rolUsuario;
    sucursalId:number;
}

export type updateUsuarioDto = Partial<createUsuarioDto>;
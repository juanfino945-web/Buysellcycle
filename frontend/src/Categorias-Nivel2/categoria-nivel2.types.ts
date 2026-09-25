import type { CategoriaNivel1 } from "../Categorias-Nivel1/categoria-nivel1.types";

export interface CategoriaNivel2 {
    id:number;
    nombre:string;
    categoriaNivel1Id:number;
    archivado:boolean;
    fechaCreacion:string;
    fechaActualizacion:string;
    categoriaNivel1?:CategoriaNivel1;
}

export interface createCategoriaNivel2Dto {
    nombre: string
    categoriaNivel1Id:number
}

export type updateCategoriaNivel2Dto = Partial<createCategoriaNivel2Dto>;   


export interface CategoriaNivel1 {
    id: number;
    nombre:string;
    archivado: boolean;
    fechaCreacion: boolean;
    fechaActualizacion:string;
}

export interface createCategoriaNivel1Dto {
    nombre: string;
}

export type updateCategoriaNvel1Dto = Partial<createCategoriaNivel1Dto>;
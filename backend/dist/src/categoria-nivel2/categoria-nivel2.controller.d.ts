import { CategoriaNivel2Service } from './categoria-nivel2.service';
import { CreateCategoriaNivel2Dto } from './dto/create-categoria-nivel2.dto';
import { UpdateCategoriaNivel2Dto } from './dto/update-categoria-nivel2.dto';
export declare class CategoriaNivel2Controller {
    private readonly categoriaNivel2Service;
    constructor(categoriaNivel2Service: CategoriaNivel2Service);
    create(createCategoriaNivel2Dto: CreateCategoriaNivel2Dto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        categoriaNivel1Id: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        categoriaNivel1: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        categoriaNivel1Id: number;
    })[]>;
    findAllArchivadas(): import("@prisma/client").Prisma.PrismaPromise<({
        categoriaNivel1: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        categoriaNivel1Id: number;
    })[]>;
    findOne(id: string): Promise<{
        categoriaNivel1: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        categoriaNivel1Id: number;
    }>;
    update(id: string, updateCategoriaNivel2Dto: UpdateCategoriaNivel2Dto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        categoriaNivel1Id: number;
    }>;
    restore(id: string): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        categoriaNivel1Id: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        categoriaNivel1Id: number;
    }>;
}

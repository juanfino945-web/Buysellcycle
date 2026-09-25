import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaNivel2Dto } from './dto/create-categoria-nivel2.dto';
import { UpdateCategoriaNivel2Dto } from './dto/update-categoria-nivel2.dto';
export declare class CategoriaNivel2Service {
    private prisma;
    constructor(prisma: PrismaService);
    private validarCategoriaNivel1;
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
    findOne(id: number): Promise<{
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
    update(id: number, updateCategoriaNivel2Dto: UpdateCategoriaNivel2Dto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        categoriaNivel1Id: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        categoriaNivel1Id: number;
    }>;
    restore(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        categoriaNivel1Id: number;
    }>;
}

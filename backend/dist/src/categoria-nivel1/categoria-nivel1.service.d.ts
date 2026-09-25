import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaNivel1Dto } from './dto/create-categoria-nivel1.dto';
import { UpdateCategoriaNivel1Dto } from './dto/update-categoria-nivel1.dto';
export declare class CategoriaNivel1Service {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoriaNivel1Dto: CreateCategoriaNivel1Dto): import("@prisma/client").Prisma.Prisma__CategoriaNivel1Client<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        categoriasNivel2: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            categoriaNivel1Id: number;
        }[];
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    })[]>;
    findAllArchivadas(): import("@prisma/client").Prisma.PrismaPromise<({
        categoriasNivel2: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            categoriaNivel1Id: number;
        }[];
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    })[]>;
    findOne(id: number): Promise<{
        categoriasNivel2: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            categoriaNivel1Id: number;
        }[];
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }>;
    update(id: number, updateCategoriaNivel1Dto: UpdateCategoriaNivel1Dto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }>;
    restore(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }>;
}

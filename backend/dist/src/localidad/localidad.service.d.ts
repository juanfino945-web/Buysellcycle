import { PrismaService } from '../prisma/prisma.service';
export declare class LocalidadService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(provinciaId?: number): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        nombre: string;
        codigoIndec: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nombre: string;
        codigoIndec: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
    }>;
}

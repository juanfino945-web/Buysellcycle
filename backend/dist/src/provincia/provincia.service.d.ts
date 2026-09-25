import { PrismaService } from '../prisma/prisma.service';
export declare class ProvinciaService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        nombre: string;
        codigoIndec: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nombre: string;
        codigoIndec: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }>;
}

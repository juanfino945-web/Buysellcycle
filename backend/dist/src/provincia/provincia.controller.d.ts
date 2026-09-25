import { ProvinciaService } from './provincia.service';
export declare class ProvinciaController {
    private readonly provinciaService;
    constructor(provinciaService: ProvinciaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        nombre: string;
        codigoIndec: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        nombre: string;
        codigoIndec: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }>;
}

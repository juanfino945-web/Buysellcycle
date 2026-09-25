import { LocalidadService } from './localidad.service';
export declare class LocalidadController {
    private readonly localidadService;
    constructor(localidadService: LocalidadService);
    findAll(provinciaId?: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        nombre: string;
        codigoIndec: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        nombre: string;
        codigoIndec: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
    }>;
}

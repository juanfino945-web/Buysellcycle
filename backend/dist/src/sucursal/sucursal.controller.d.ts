import { SucursalService } from './sucursal.service';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
export declare class SucursalController {
    private readonly sucursalService;
    constructor(sucursalService: SucursalService);
    create(createSucursalDto: CreateSucursalDto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        provincia: {
            id: number;
            nombre: string;
            codigoIndec: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
        localidad: {
            id: number;
            nombre: string;
            codigoIndec: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
        };
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
    })[]>;
    findAllArchivadas(): import("@prisma/client").Prisma.PrismaPromise<({
        provincia: {
            id: number;
            nombre: string;
            codigoIndec: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
        localidad: {
            id: number;
            nombre: string;
            codigoIndec: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
        };
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
    })[]>;
    findOne(id: string): Promise<{
        provincia: {
            id: number;
            nombre: string;
            codigoIndec: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
        localidad: {
            id: number;
            nombre: string;
            codigoIndec: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
        };
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
    }>;
    update(id: string, updateSucursalDto: UpdateSucursalDto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
    }>;
    restore(id: string): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
    }>;
}

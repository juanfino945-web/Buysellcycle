import { PrismaService } from '../prisma/prisma.service';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
export declare class SucursalService {
    private prisma;
    constructor(prisma: PrismaService);
    private validarDuplicado;
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
    findOne(id: number): Promise<{
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
    update(id: number, updateSucursalDto: UpdateSucursalDto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
    }>;
    restore(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
    }>;
}

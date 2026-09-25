import { PrismaService } from '../prisma/prisma.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
export declare class ProveedorService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProveedorDto: CreateProveedorDto): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        razonSocial: string;
        cuit: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        razonSocial: string;
        cuit: string;
    }[]>;
    findAllArchivados(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        razonSocial: string;
        cuit: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        razonSocial: string;
        cuit: string;
    }>;
    update(id: number, updateProveedorDto: UpdateProveedorDto): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        razonSocial: string;
        cuit: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        razonSocial: string;
        cuit: string;
    }>;
    restore(id: number): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        razonSocial: string;
        cuit: string;
    }>;
}

import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
export declare class ProveedorController {
    private readonly proveedorService;
    constructor(proveedorService: ProveedorService);
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
    findOne(id: string): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        razonSocial: string;
        cuit: string;
    }>;
    update(id: string, updateProveedorDto: UpdateProveedorDto): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        razonSocial: string;
        cuit: string;
    }>;
    restore(id: string): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        razonSocial: string;
        cuit: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        razonSocial: string;
        cuit: string;
    }>;
}

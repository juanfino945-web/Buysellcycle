import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
export declare class MarcaController {
    private readonly marcaService;
    constructor(marcaService: MarcaService);
    create(createMarcaDto: CreateMarcaDto): import("@prisma/client").Prisma.Prisma__MarcaClient<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }[]>;
    findAllArchivadas(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }>;
    update(id: string, updateMarcaDto: UpdateMarcaDto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }>;
    restore(id: string): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
    }>;
}

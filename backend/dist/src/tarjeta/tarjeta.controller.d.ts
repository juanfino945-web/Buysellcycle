import { TarjetaService } from './tarjeta.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
export declare class TarjetaController {
    private readonly tarjetaService;
    constructor(tarjetaService: TarjetaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tipo: import("@prisma/client").$Enums.TipoTarjeta;
    }[]>;
    findArchivados(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tipo: import("@prisma/client").$Enums.TipoTarjeta;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tipo: import("@prisma/client").$Enums.TipoTarjeta;
    }>;
    create(dto: CreateTarjetaDto): import("@prisma/client").Prisma.Prisma__TarjetaClient<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tipo: import("@prisma/client").$Enums.TipoTarjeta;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateTarjetaDto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tipo: import("@prisma/client").$Enums.TipoTarjeta;
    }>;
    restaurar(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tipo: import("@prisma/client").$Enums.TipoTarjeta;
    }>;
    archivar(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tipo: import("@prisma/client").$Enums.TipoTarjeta;
    }>;
}

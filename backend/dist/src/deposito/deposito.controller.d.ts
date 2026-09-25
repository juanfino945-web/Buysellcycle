import { DepositoService } from './deposito.service';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';
export declare class DepositoController {
    private readonly depositoService;
    constructor(depositoService: DepositoService);
    create(createDepositoDto: CreateDepositoDto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
        codigo: string;
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
        codigo: string;
    })[]>;
    findAllArchivados(): import("@prisma/client").Prisma.PrismaPromise<({
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
        codigo: string;
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
        stocks: {
            id: number;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            productoId: number;
            depositoId: number;
            stock: number;
            ultimoMovimiento: string | null;
        }[];
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
        codigo: string;
    }>;
    update(id: string, updateDepositoDto: UpdateDepositoDto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
        codigo: string;
    }>;
    restore(id: string): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
        codigo: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
        codigo: string;
    }>;
}

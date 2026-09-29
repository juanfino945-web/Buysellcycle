import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlanService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(tarjetaId?: number, bancoId?: number): Prisma.PrismaPromise<({
        tarjeta: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            tipo: import("@prisma/client").$Enums.TipoTarjeta;
        };
        banco: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
    } & {
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tarjetaId: number;
        bancoId: number;
        cantidadCuotas: number;
        tasaFinanciacion: Prisma.Decimal;
        observaciones: string | null;
    })[]>;
    findOne(id: number): Promise<{
        tarjeta: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            tipo: import("@prisma/client").$Enums.TipoTarjeta;
        };
        banco: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
    } & {
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tarjetaId: number;
        bancoId: number;
        cantidadCuotas: number;
        tasaFinanciacion: Prisma.Decimal;
        observaciones: string | null;
    }>;
    private validarRelaciones;
    create(dto: CreatePlanDto): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tarjetaId: number;
        bancoId: number;
        cantidadCuotas: number;
        tasaFinanciacion: Prisma.Decimal;
        observaciones: string | null;
    }>;
    update(id: number, dto: UpdatePlanDto): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tarjetaId: number;
        bancoId: number;
        cantidadCuotas: number;
        tasaFinanciacion: Prisma.Decimal;
        observaciones: string | null;
    }>;
    archivar(id: number): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tarjetaId: number;
        bancoId: number;
        cantidadCuotas: number;
        tasaFinanciacion: Prisma.Decimal;
        observaciones: string | null;
    }>;
    findArchivados(): Prisma.PrismaPromise<({
        tarjeta: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            tipo: import("@prisma/client").$Enums.TipoTarjeta;
        };
        banco: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
    } & {
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tarjetaId: number;
        bancoId: number;
        cantidadCuotas: number;
        tasaFinanciacion: Prisma.Decimal;
        observaciones: string | null;
    })[]>;
    restaurar(id: number): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tarjetaId: number;
        bancoId: number;
        cantidadCuotas: number;
        tasaFinanciacion: Prisma.Decimal;
        observaciones: string | null;
    }>;
}

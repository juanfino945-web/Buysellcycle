import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    findAll(tarjetaId?: string, bancoId?: string): import("@prisma/client").Prisma.PrismaPromise<({
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
        tasaFinanciacion: import("@prisma/client/runtime/library").Decimal;
        observaciones: string | null;
    })[]>;
    findArchivados(): import("@prisma/client").Prisma.PrismaPromise<({
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
        tasaFinanciacion: import("@prisma/client/runtime/library").Decimal;
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
        tasaFinanciacion: import("@prisma/client/runtime/library").Decimal;
        observaciones: string | null;
    }>;
    create(dto: CreatePlanDto): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tarjetaId: number;
        bancoId: number;
        cantidadCuotas: number;
        tasaFinanciacion: import("@prisma/client/runtime/library").Decimal;
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
        tasaFinanciacion: import("@prisma/client/runtime/library").Decimal;
        observaciones: string | null;
    }>;
    restaurar(id: number): Promise<{
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        tarjetaId: number;
        bancoId: number;
        cantidadCuotas: number;
        tasaFinanciacion: import("@prisma/client/runtime/library").Decimal;
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
        tasaFinanciacion: import("@prisma/client/runtime/library").Decimal;
        observaciones: string | null;
    }>;
}

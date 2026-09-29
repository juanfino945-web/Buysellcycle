import { PrismaService } from '../prisma/prisma.service';
import { SimularFinanciacionDto } from './dto/simular-financiacion.dto';
export declare class FinanciacionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    calcular(monto: number, tasaFinanciacion: number, cantidadCuotas: number): {
        montoTotal: number;
        montoCuota: number;
    };
    simular(dto: SimularFinanciacionDto): Promise<{
        montoTotal: number;
        montoCuota: number;
        cantidadCuotas: number;
        tasaFinanciacion: number;
    }>;
    historial(): import("@prisma/client").Prisma.PrismaPromise<({
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
        plan: {
            id: number;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            tarjetaId: number;
            bancoId: number;
            cantidadCuotas: number;
            tasaFinanciacion: import("@prisma/client/runtime/library").Decimal;
            observaciones: string | null;
        };
    } & {
        id: number;
        fechaCreacion: Date;
        tarjetaId: number;
        bancoId: number;
        cantidadCuotas: number;
        tasaFinanciacion: import("@prisma/client/runtime/library").Decimal;
        monto: import("@prisma/client/runtime/library").Decimal;
        planId: number;
        montoTotal: import("@prisma/client/runtime/library").Decimal;
        montoCuota: import("@prisma/client/runtime/library").Decimal;
    })[]>;
}

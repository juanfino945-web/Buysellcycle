import { PrismaService } from '../prisma/prisma.service';
import { CreatePresupuestoDto } from './dto/create-presupuesto.dto';
export declare class PresupuestoService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePresupuestoDto): Promise<{
        cliente: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
            localidadId: number;
            apellido: string;
            dni: string;
            email: string;
        };
        items: ({
            producto: {
                id: number;
                nombre: string;
                archivado: boolean;
                fechaCreacion: Date;
                fechaActualizacion: Date;
                costoNeto: import("@prisma/client/runtime/library").Decimal;
                utilidadPorcentaje: import("@prisma/client/runtime/library").Decimal;
                descuentoContadoPorcentaje: import("@prisma/client/runtime/library").Decimal;
                marcaId: number;
                categoriaNivel2Id: number;
                rutaImagenStorage: string | null;
                precioLista: import("@prisma/client/runtime/library").Decimal;
                precioContado: import("@prisma/client/runtime/library").Decimal;
                stockTotal: number;
                estado: import("@prisma/client").$Enums.EstadoProducto;
                fechaHoraUltimoMovimientoStock: Date | null;
                fechaHoraUltimaSincronizacionStock: Date | null;
            };
        } & {
            id: number;
            productoId: number;
            cantidad: number;
            precioUnitario: import("@prisma/client/runtime/library").Decimal;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            presupuestoId: number;
        })[];
    } & {
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        clienteId: number;
        fechaEmision: Date;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        cliente: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
            localidadId: number;
            apellido: string;
            dni: string;
            email: string;
        };
        items: ({
            producto: {
                id: number;
                nombre: string;
                archivado: boolean;
                fechaCreacion: Date;
                fechaActualizacion: Date;
                costoNeto: import("@prisma/client/runtime/library").Decimal;
                utilidadPorcentaje: import("@prisma/client/runtime/library").Decimal;
                descuentoContadoPorcentaje: import("@prisma/client/runtime/library").Decimal;
                marcaId: number;
                categoriaNivel2Id: number;
                rutaImagenStorage: string | null;
                precioLista: import("@prisma/client/runtime/library").Decimal;
                precioContado: import("@prisma/client/runtime/library").Decimal;
                stockTotal: number;
                estado: import("@prisma/client").$Enums.EstadoProducto;
                fechaHoraUltimoMovimientoStock: Date | null;
                fechaHoraUltimaSincronizacionStock: Date | null;
            };
        } & {
            id: number;
            productoId: number;
            cantidad: number;
            precioUnitario: import("@prisma/client/runtime/library").Decimal;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            presupuestoId: number;
        })[];
    } & {
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        clienteId: number;
        fechaEmision: Date;
        total: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    findAllArchivados(): import("@prisma/client").Prisma.PrismaPromise<({
        cliente: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
            localidadId: number;
            apellido: string;
            dni: string;
            email: string;
        };
        items: ({
            producto: {
                id: number;
                nombre: string;
                archivado: boolean;
                fechaCreacion: Date;
                fechaActualizacion: Date;
                costoNeto: import("@prisma/client/runtime/library").Decimal;
                utilidadPorcentaje: import("@prisma/client/runtime/library").Decimal;
                descuentoContadoPorcentaje: import("@prisma/client/runtime/library").Decimal;
                marcaId: number;
                categoriaNivel2Id: number;
                rutaImagenStorage: string | null;
                precioLista: import("@prisma/client/runtime/library").Decimal;
                precioContado: import("@prisma/client/runtime/library").Decimal;
                stockTotal: number;
                estado: import("@prisma/client").$Enums.EstadoProducto;
                fechaHoraUltimoMovimientoStock: Date | null;
                fechaHoraUltimaSincronizacionStock: Date | null;
            };
        } & {
            id: number;
            productoId: number;
            cantidad: number;
            precioUnitario: import("@prisma/client/runtime/library").Decimal;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            presupuestoId: number;
        })[];
    } & {
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        clienteId: number;
        fechaEmision: Date;
        total: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    findOne(id: number): Promise<{
        cliente: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
            localidadId: number;
            apellido: string;
            dni: string;
            email: string;
        };
        items: ({
            producto: {
                id: number;
                nombre: string;
                archivado: boolean;
                fechaCreacion: Date;
                fechaActualizacion: Date;
                costoNeto: import("@prisma/client/runtime/library").Decimal;
                utilidadPorcentaje: import("@prisma/client/runtime/library").Decimal;
                descuentoContadoPorcentaje: import("@prisma/client/runtime/library").Decimal;
                marcaId: number;
                categoriaNivel2Id: number;
                rutaImagenStorage: string | null;
                precioLista: import("@prisma/client/runtime/library").Decimal;
                precioContado: import("@prisma/client/runtime/library").Decimal;
                stockTotal: number;
                estado: import("@prisma/client").$Enums.EstadoProducto;
                fechaHoraUltimoMovimientoStock: Date | null;
                fechaHoraUltimaSincronizacionStock: Date | null;
            };
        } & {
            id: number;
            productoId: number;
            cantidad: number;
            precioUnitario: import("@prisma/client/runtime/library").Decimal;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            presupuestoId: number;
        })[];
    } & {
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        clienteId: number;
        fechaEmision: Date;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
    remove(id: number): Promise<{
        cliente: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
            localidadId: number;
            apellido: string;
            dni: string;
            email: string;
        };
        items: ({
            producto: {
                id: number;
                nombre: string;
                archivado: boolean;
                fechaCreacion: Date;
                fechaActualizacion: Date;
                costoNeto: import("@prisma/client/runtime/library").Decimal;
                utilidadPorcentaje: import("@prisma/client/runtime/library").Decimal;
                descuentoContadoPorcentaje: import("@prisma/client/runtime/library").Decimal;
                marcaId: number;
                categoriaNivel2Id: number;
                rutaImagenStorage: string | null;
                precioLista: import("@prisma/client/runtime/library").Decimal;
                precioContado: import("@prisma/client/runtime/library").Decimal;
                stockTotal: number;
                estado: import("@prisma/client").$Enums.EstadoProducto;
                fechaHoraUltimoMovimientoStock: Date | null;
                fechaHoraUltimaSincronizacionStock: Date | null;
            };
        } & {
            id: number;
            productoId: number;
            cantidad: number;
            precioUnitario: import("@prisma/client/runtime/library").Decimal;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            presupuestoId: number;
        })[];
    } & {
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        clienteId: number;
        fechaEmision: Date;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
    restore(id: number): Promise<{
        cliente: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
            localidadId: number;
            apellido: string;
            dni: string;
            email: string;
        };
        items: ({
            producto: {
                id: number;
                nombre: string;
                archivado: boolean;
                fechaCreacion: Date;
                fechaActualizacion: Date;
                costoNeto: import("@prisma/client/runtime/library").Decimal;
                utilidadPorcentaje: import("@prisma/client/runtime/library").Decimal;
                descuentoContadoPorcentaje: import("@prisma/client/runtime/library").Decimal;
                marcaId: number;
                categoriaNivel2Id: number;
                rutaImagenStorage: string | null;
                precioLista: import("@prisma/client/runtime/library").Decimal;
                precioContado: import("@prisma/client/runtime/library").Decimal;
                stockTotal: number;
                estado: import("@prisma/client").$Enums.EstadoProducto;
                fechaHoraUltimoMovimientoStock: Date | null;
                fechaHoraUltimaSincronizacionStock: Date | null;
            };
        } & {
            id: number;
            productoId: number;
            cantidad: number;
            precioUnitario: import("@prisma/client/runtime/library").Decimal;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            presupuestoId: number;
        })[];
    } & {
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        clienteId: number;
        fechaEmision: Date;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
}

import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
export declare class ProductoController {
    private readonly productoService;
    constructor(productoService: ProductoService);
    create(createProductoDto: CreateProductoDto): Promise<{
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
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        marca: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
        categoriaNivel2: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            categoriaNivel1Id: number;
        };
    } & {
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
    })[]>;
    findAllArchivados(): import("@prisma/client").Prisma.PrismaPromise<({
        marca: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
        categoriaNivel2: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            categoriaNivel1Id: number;
        };
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        marca: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
        categoriaNivel2: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            categoriaNivel1Id: number;
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
    }>;
    update(id: string, updateProductoDto: UpdateProductoDto): Promise<{
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
    }>;
    restore(id: string): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}

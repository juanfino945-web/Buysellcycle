import { StockService } from './stock.service';
import { MovimientoStockDto } from './dto/movimiento-stock.dto';
import { TransferenciaStockDto } from './dto/transferencia-stock.dto';
export declare class StockController {
    private readonly stockService;
    constructor(stockService: StockService);
    ingreso(dto: MovimientoStockDto): Promise<{
        mensaje: string;
        productoId: number;
        depositoId: number;
        stockDeposito: number;
        stockTotal: number;
    }>;
    egreso(dto: MovimientoStockDto): Promise<{
        mensaje: string;
        productoId: number;
        depositoId: number;
        stockDeposito: number;
        stockTotal: number;
    }>;
    transferencia(dto: TransferenciaStockDto): Promise<{
        mensaje: string;
        productoId: number;
        depositoOrigenId: number;
        depositoDestinoId: number;
        stockOrigenRestante: number;
        stockDestinoActual: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        deposito: {
            id: number;
            nombre: string;
            codigo: string;
        };
        producto: {
            id: number;
            nombre: string;
        };
    } & {
        id: number;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        productoId: number;
        depositoId: number;
        stock: number;
        ultimoMovimiento: string | null;
    })[]>;
}

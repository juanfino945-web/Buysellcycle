"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StockService = class StockService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async recalcularStockTotal(productoId, tx = this.prisma) {
        const stocks = await tx.stockProductoDeposito.findMany({
            where: { productoId, archivado: false },
        });
        const stockTotal = stocks.reduce((acc, s) => acc + s.stock, 0);
        await tx.producto.update({
            where: { id: productoId },
            data: {
                stockTotal,
                fechaHoraUltimoMovimientoStock: new Date(),
            },
        });
        return stockTotal;
    }
    async obtenerOCrearFilaStock(productoId, depositoId, tx = this.prisma) {
        let fila = await tx.stockProductoDeposito.findUnique({
            where: { productoId_depositoId: { productoId, depositoId } },
        });
        if (!fila) {
            fila = await tx.stockProductoDeposito.create({
                data: { productoId, depositoId, stock: 0 },
            });
        }
        return fila;
    }
    async validarProductoYDeposito(productoId, depositoId) {
        const producto = await this.prisma.producto.findUnique({ where: { id: productoId } });
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con id ${productoId} no encontrado`);
        }
        const deposito = await this.prisma.deposito.findUnique({ where: { id: depositoId } });
        if (!deposito) {
            throw new common_1.NotFoundException(`Depósito con id ${depositoId} no encontrado`);
        }
    }
    findAll() {
        return this.prisma.stockProductoDeposito.findMany({
            where: { archivado: false, stock: { gt: 0 } },
            include: {
                producto: { select: { id: true, nombre: true } },
                deposito: { select: { id: true, nombre: true, codigo: true } },
            },
            orderBy: { fechaActualizacion: 'desc' },
        });
    }
    async ingreso(dto) {
        const { productoId, depositoId, cantidad } = dto;
        await this.validarProductoYDeposito(productoId, depositoId);
        return this.prisma.$transaction(async (tx) => {
            const fila = await this.obtenerOCrearFilaStock(productoId, depositoId, tx);
            await tx.stockProductoDeposito.update({
                where: { id: fila.id },
                data: { stock: fila.stock + cantidad, ultimoMovimiento: 'INGRESO' },
            });
            const stockTotal = await this.recalcularStockTotal(productoId, tx);
            return {
                mensaje: 'Ingreso registrado correctamente',
                productoId,
                depositoId,
                stockDeposito: fila.stock + cantidad,
                stockTotal,
            };
        });
    }
    async egreso(dto) {
        const { productoId, depositoId, cantidad } = dto;
        await this.validarProductoYDeposito(productoId, depositoId);
        return this.prisma.$transaction(async (tx) => {
            const fila = await this.obtenerOCrearFilaStock(productoId, depositoId, tx);
            if (fila.stock < cantidad) {
                throw new common_1.BadRequestException(`Stock insuficiente en el depósito. Disponible: ${fila.stock}, solicitado: ${cantidad}`);
            }
            await tx.stockProductoDeposito.update({
                where: { id: fila.id },
                data: { stock: fila.stock - cantidad, ultimoMovimiento: 'EGRESO' },
            });
            const stockTotal = await this.recalcularStockTotal(productoId, tx);
            return {
                mensaje: 'Egreso registrado correctamente',
                productoId,
                depositoId,
                stockDeposito: fila.stock - cantidad,
                stockTotal,
            };
        });
    }
    async transferencia(dto) {
        const { productoId, depositoOrigenId, depositoDestinoId, cantidad } = dto;
        if (depositoOrigenId === depositoDestinoId) {
            throw new common_1.BadRequestException('El depósito origen y destino no pueden ser el mismo');
        }
        await this.validarProductoYDeposito(productoId, depositoOrigenId);
        await this.validarProductoYDeposito(productoId, depositoDestinoId);
        return this.prisma.$transaction(async (tx) => {
            const filaOrigen = await this.obtenerOCrearFilaStock(productoId, depositoOrigenId, tx);
            if (filaOrigen.stock < cantidad) {
                throw new common_1.BadRequestException(`Stock insuficiente en el deposito origen. Disponible: ${filaOrigen.stock}, solicitado: ${cantidad}`);
            }
            await tx.stockProductoDeposito.update({
                where: { id: filaOrigen.id },
                data: { stock: filaOrigen.stock - cantidad, ultimoMovimiento: 'TRANSFERENCIA_ORIGEN' },
            });
            const filaDestino = await this.obtenerOCrearFilaStock(productoId, depositoDestinoId, tx);
            await tx.stockProductoDeposito.update({
                where: { id: filaDestino.id },
                data: { stock: filaDestino.stock + cantidad, ultimoMovimiento: 'TRANSFERENCIA_DESTINO' },
            });
            await tx.producto.update({
                where: { id: productoId },
                data: { fechaHoraUltimoMovimientoStock: new Date() },
            });
            return {
                mensaje: 'Transferencia registrada correctamente',
                productoId,
                depositoOrigenId,
                depositoDestinoId,
                stockOrigenRestante: filaOrigen.stock - cantidad,
                stockDestinoActual: filaDestino.stock + cantidad,
            };
        });
    }
};
exports.StockService = StockService;
exports.StockService = StockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockService);
//# sourceMappingURL=stock.service.js.map
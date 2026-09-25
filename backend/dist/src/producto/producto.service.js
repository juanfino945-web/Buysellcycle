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
exports.ProductoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const schedule_1 = require("@nestjs/schedule");
let ProductoService = class ProductoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    calcularPrecios(costoNeto, utilidadPorcentaje, descuentoContadoPorcentaje) {
        const precioLista = costoNeto + (costoNeto * utilidadPorcentaje) / 100;
        const precioContado = precioLista - (precioLista * descuentoContadoPorcentaje) / 100;
        return {
            precioLista: Math.round(precioLista * 100) / 100,
            precioContado: Math.round(precioContado * 100) / 100,
        };
    }
    async create(createProductoDto) {
        const { costoNeto, utilidadPorcentaje, descuentoContadoPorcentaje } = createProductoDto;
        const { precioLista, precioContado } = this.calcularPrecios(costoNeto, utilidadPorcentaje, descuentoContadoPorcentaje);
        return this.prisma.producto.create({
            data: {
                ...createProductoDto,
                precioLista,
                precioContado,
                stockTotal: 0,
                estado: 'DISPONIBLE',
            },
        });
    }
    findAll() {
        return this.prisma.producto.findMany({
            where: { archivado: false },
            include: { marca: true, categoriaNivel2: true },
            orderBy: { nombre: 'asc' },
        });
    }
    findAllArchivados() {
        return this.prisma.producto.findMany({
            where: { archivado: true },
            include: { marca: true, categoriaNivel2: true },
            orderBy: { nombre: 'asc' },
        });
    }
    async findOne(id) {
        const producto = await this.prisma.producto.findUnique({
            where: { id },
            include: { marca: true, categoriaNivel2: true, stocks: true },
        });
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con id ${id} no encontrado`);
        }
        return producto;
    }
    async update(id, updateProductoDto) {
        const productoActual = await this.findOne(id);
        const costoNeto = updateProductoDto.costoNeto ?? Number(productoActual.costoNeto);
        const utilidadPorcentaje = updateProductoDto.utilidadPorcentaje ?? Number(productoActual.utilidadPorcentaje);
        const descuentoContadoPorcentaje = updateProductoDto.descuentoContadoPorcentaje ??
            Number(productoActual.descuentoContadoPorcentaje);
        const afectaPrecio = updateProductoDto.costoNeto !== undefined ||
            updateProductoDto.utilidadPorcentaje !== undefined ||
            updateProductoDto.descuentoContadoPorcentaje !== undefined;
        const precios = afectaPrecio
            ? this.calcularPrecios(costoNeto, utilidadPorcentaje, descuentoContadoPorcentaje)
            : {};
        return this.prisma.producto.update({
            where: { id },
            data: {
                ...updateProductoDto,
                ...precios,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.producto.update({
            where: { id },
            data: { archivado: true },
        });
    }
    async restore(id) {
        await this.findOne(id);
        return this.prisma.producto.update({
            where: { id },
            data: { archivado: false },
        });
    }
    async actualizarEstadosPorInactividad() {
        const ahora = new Date();
        const productosSinStock = await this.prisma.producto.findMany({
            where: {
                stockTotal: 0,
                archivado: false,
                fechaHoraUltimoMovimientoStock: { not: null },
            },
        });
        for (const producto of productosSinStock) {
            const diasSinMovimiento = Math.floor((ahora.getTime() - producto.fechaHoraUltimoMovimientoStock.getTime()) /
                (1000 * 60 * 60 * 24));
            let nuevoEstado = null;
            if (diasSinMovimiento >= 15) {
                nuevoEstado = 'INACTIVO';
            }
            else if (diasSinMovimiento >= 7) {
                nuevoEstado = 'ACTIVO';
            }
            if (nuevoEstado && nuevoEstado !== producto.estado) {
                await this.prisma.producto.update({
                    where: { id: producto.id },
                    data: { estado: nuevoEstado },
                });
            }
        }
    }
};
exports.ProductoService = ProductoService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductoService.prototype, "actualizarEstadosPorInactividad", null);
exports.ProductoService = ProductoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductoService);
//# sourceMappingURL=producto.service.js.map
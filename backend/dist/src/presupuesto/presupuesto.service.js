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
exports.PresupuestoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PresupuestoService = class PresupuestoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const { clienteId, items } = dto;
        const cliente = await this.prisma.cliente.findUnique({
            where: { id: clienteId },
        });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente con id ${clienteId} no encontrado`);
        }
        const productoIds = items.map((i) => i.productoId);
        const productos = await this.prisma.producto.findMany({
            where: { id: { in: productoIds } },
        });
        for (const item of items) {
            const existe = productos.find((p) => p.id === item.productoId);
            if (!existe) {
                throw new common_1.NotFoundException(`Producto con id ${item.productoId} no encontrado`);
            }
        }
        const itemsCalculados = items.map((item) => {
            const producto = productos.find((p) => p.id === item.productoId);
            const precioUnitario = Number(producto.precioLista);
            const subtotal = Math.round(precioUnitario * item.cantidad * 100) / 100;
            return {
                productoId: item.productoId,
                cantidad: item.cantidad,
                precioUnitario,
                subtotal,
            };
        });
        const total = itemsCalculados.reduce((acc, i) => acc + i.subtotal, 0);
        return this.prisma.presupuesto.create({
            data: {
                clienteId,
                total,
                items: {
                    create: itemsCalculados,
                },
            },
            include: {
                cliente: true,
                items: { include: { producto: true } },
            },
        });
    }
    findAll() {
        return this.prisma.presupuesto.findMany({
            where: { archivado: false },
            include: { cliente: true, items: { include: { producto: true } } },
            orderBy: { fechaEmision: 'desc' },
        });
    }
    findAllArchivados() {
        return this.prisma.presupuesto.findMany({
            where: { archivado: true },
            include: { cliente: true, items: { include: { producto: true } } },
            orderBy: { fechaEmision: 'desc' },
        });
    }
    async findOne(id) {
        const presupuesto = await this.prisma.presupuesto.findUnique({
            where: { id },
            include: { cliente: true, items: { include: { producto: true } } },
        });
        if (!presupuesto) {
            throw new common_1.NotFoundException(`Presupuesto con id ${id} no encontrado`);
        }
        return presupuesto;
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.presupuesto.update({
            where: { id },
            data: { archivado: true },
            include: { cliente: true, items: { include: { producto: true } } },
        });
    }
    async restore(id) {
        await this.findOne(id);
        return this.prisma.presupuesto.update({
            where: { id },
            data: { archivado: false },
            include: { cliente: true, items: { include: { producto: true } } },
        });
    }
};
exports.PresupuestoService = PresupuestoService;
exports.PresupuestoService = PresupuestoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PresupuestoService);
//# sourceMappingURL=presupuesto.service.js.map
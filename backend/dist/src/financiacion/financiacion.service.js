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
exports.FinanciacionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FinanciacionService = class FinanciacionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    calcular(monto, tasaFinanciacion, cantidadCuotas) {
        const montoTotal = monto * (1 + tasaFinanciacion / 100);
        const montoCuota = montoTotal / cantidadCuotas;
        return {
            montoTotal: Math.round(montoTotal * 100) / 100,
            montoCuota: Math.round(montoCuota * 100) / 100,
        };
    }
    async simular(dto) {
        const plan = await this.prisma.plan.findFirst({
            where: { id: dto.planId, archivado: false },
        });
        if (!plan)
            throw new common_1.NotFoundException(`Plan ${dto.planId} no encontrado`);
        if (plan.tarjetaId !== dto.tarjetaId || plan.bancoId !== dto.bancoId) {
            throw new common_1.BadRequestException('El plan seleccionado no corresponde a la combinación de tarjeta y banco indicada');
        }
        const { montoTotal, montoCuota } = this.calcular(dto.monto, Number(plan.tasaFinanciacion), plan.cantidadCuotas);
        await this.prisma.simulacionFinanciacion.create({
            data: {
                monto: dto.monto,
                montoTotal,
                montoCuota,
                cantidadCuotas: plan.cantidadCuotas,
                tasaFinanciacion: plan.tasaFinanciacion,
                tarjetaId: dto.tarjetaId,
                bancoId: dto.bancoId,
                planId: dto.planId,
            },
        });
        return {
            montoTotal,
            montoCuota,
            cantidadCuotas: plan.cantidadCuotas,
            tasaFinanciacion: Number(plan.tasaFinanciacion),
        };
    }
    historial() {
        return this.prisma.simulacionFinanciacion.findMany({
            include: { tarjeta: true, banco: true, plan: true },
            orderBy: { fechaCreacion: 'desc' },
            take: 50,
        });
    }
};
exports.FinanciacionService = FinanciacionService;
exports.FinanciacionService = FinanciacionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinanciacionService);
//# sourceMappingURL=financiacion.service.js.map
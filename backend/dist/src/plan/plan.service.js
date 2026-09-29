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
exports.PlanService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let PlanService = class PlanService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(tarjetaId, bancoId) {
        return this.prisma.plan.findMany({
            where: {
                archivado: false,
                ...(tarjetaId ? { tarjetaId } : {}),
                ...(bancoId ? { bancoId } : {}),
            },
            include: { tarjeta: true, banco: true },
            orderBy: { cantidadCuotas: 'asc' },
        });
    }
    async findOne(id) {
        const plan = await this.prisma.plan.findFirst({
            where: { id, archivado: false },
            include: { tarjeta: true, banco: true },
        });
        if (!plan)
            throw new common_1.NotFoundException(`Plan ${id} no encontrado`);
        return plan;
    }
    async validarRelaciones(tarjetaId, bancoId) {
        const tarjeta = await this.prisma.tarjeta.findFirst({
            where: { id: tarjetaId, archivado: false },
        });
        if (!tarjeta)
            throw new common_1.NotFoundException(`Tarjeta ${tarjetaId} no encontrada`);
        const banco = await this.prisma.banco.findFirst({
            where: { id: bancoId, archivado: false },
        });
        if (!banco)
            throw new common_1.NotFoundException(`Banco ${bancoId} no encontrado`);
    }
    async create(dto) {
        await this.validarRelaciones(dto.tarjetaId, dto.bancoId);
        try {
            return await this.prisma.plan.create({ data: dto });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new common_1.ConflictException('Ya existe un plan con esa combinación de tarjeta, banco y cantidad de cuotas');
            }
            throw error;
        }
    }
    async update(id, dto) {
        const actual = await this.findOne(id);
        if (dto.tarjetaId || dto.bancoId) {
            await this.validarRelaciones(dto.tarjetaId ?? actual.tarjetaId, dto.bancoId ?? actual.bancoId);
        }
        try {
            return await this.prisma.plan.update({ where: { id }, data: dto });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new common_1.ConflictException('Ya existe un plan con esa combinación de tarjeta, banco y cantidad de cuotas');
            }
            throw error;
        }
    }
    async archivar(id) {
        await this.findOne(id);
        return this.prisma.plan.update({ where: { id }, data: { archivado: true } });
    }
    findArchivados() {
        return this.prisma.plan.findMany({
            where: { archivado: true },
            include: { tarjeta: true, banco: true },
            orderBy: { cantidadCuotas: 'asc' },
        });
    }
    async restaurar(id) {
        const plan = await this.prisma.plan.findFirst({
            where: { id, archivado: true },
        });
        if (!plan)
            throw new common_1.NotFoundException(`Plan ${id} archivado no encontrado`);
        return this.prisma.plan.update({
            where: { id },
            data: { archivado: false },
        });
    }
};
exports.PlanService = PlanService;
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlanService);
//# sourceMappingURL=plan.service.js.map
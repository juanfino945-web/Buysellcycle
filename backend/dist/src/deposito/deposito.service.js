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
exports.DepositoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DepositoService = class DepositoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generarCodigo() {
        const cantidad = await this.prisma.deposito.count();
        const siguienteNumero = cantidad + 1;
        return `DEP-${siguienteNumero.toString().padStart(2, '0')}`;
    }
    async create(createDepositoDto) {
        const codigo = await this.generarCodigo();
        return this.prisma.deposito.create({
            data: {
                ...createDepositoDto,
                codigo,
            },
        });
    }
    findAll() {
        return this.prisma.deposito.findMany({
            where: { archivado: false },
            include: { provincia: true, localidad: true },
            orderBy: { nombre: 'asc' },
        });
    }
    findAllArchivados() {
        return this.prisma.deposito.findMany({
            where: { archivado: true },
            include: { provincia: true, localidad: true },
            orderBy: { nombre: 'asc' },
        });
    }
    async findOne(id) {
        const deposito = await this.prisma.deposito.findUnique({
            where: { id },
            include: { provincia: true, localidad: true, stocks: true },
        });
        if (!deposito) {
            throw new common_1.NotFoundException(`Depósito con id ${id} no encontrado`);
        }
        return deposito;
    }
    async update(id, updateDepositoDto) {
        await this.findOne(id);
        return this.prisma.deposito.update({
            where: { id },
            data: updateDepositoDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.deposito.update({
            where: { id },
            data: { archivado: true },
        });
    }
    async restore(id) {
        await this.findOne(id);
        return this.prisma.deposito.update({
            where: { id },
            data: { archivado: false },
        });
    }
};
exports.DepositoService = DepositoService;
exports.DepositoService = DepositoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepositoService);
//# sourceMappingURL=deposito.service.js.map
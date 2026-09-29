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
exports.BancoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BancoService = class BancoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.banco.findMany({
            where: { archivado: false },
            orderBy: { nombre: 'asc' },
        });
    }
    async findOne(id) {
        const banco = await this.prisma.banco.findFirst({
            where: { id, archivado: false },
        });
        if (!banco)
            throw new common_1.NotFoundException(`Banco ${id} no encontrado`);
        return banco;
    }
    create(dto) {
        return this.prisma.banco.create({ data: dto });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.banco.update({ where: { id }, data: dto });
    }
    async archivar(id) {
        await this.findOne(id);
        return this.prisma.banco.update({
            where: { id },
            data: { archivado: true },
        });
    }
    findArchivados() {
        return this.prisma.banco.findMany({
            where: { archivado: true },
            orderBy: { nombre: 'asc' },
        });
    }
    async restaurar(id) {
        const banco = await this.prisma.banco.findFirst({
            where: { id, archivado: true },
        });
        if (!banco)
            throw new common_1.NotFoundException(`banco ${id} archivado no encontrada`);
        return this.prisma.banco.update({
            where: { id },
            data: { archivado: false },
        });
    }
};
exports.BancoService = BancoService;
exports.BancoService = BancoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BancoService);
//# sourceMappingURL=banco.service.js.map
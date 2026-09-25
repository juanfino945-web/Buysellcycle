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
exports.CategoriaNivel2Service = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriaNivel2Service = class CategoriaNivel2Service {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validarCategoriaNivel1(categoriaNivel1Id) {
        const padre = await this.prisma.categoriaNivel1.findUnique({
            where: { id: categoriaNivel1Id },
        });
        if (!padre) {
            throw new common_1.NotFoundException(`CategoríaNivel1 con id ${categoriaNivel1Id} no encontrada`);
        }
    }
    async create(createCategoriaNivel2Dto) {
        await this.validarCategoriaNivel1(createCategoriaNivel2Dto.categoriaNivel1Id);
        return this.prisma.categoriaNivel2.create({
            data: createCategoriaNivel2Dto,
        });
    }
    findAll() {
        return this.prisma.categoriaNivel2.findMany({
            where: { archivado: false },
            include: { categoriaNivel1: true },
            orderBy: { nombre: 'asc' },
        });
    }
    findAllArchivadas() {
        return this.prisma.categoriaNivel2.findMany({
            where: { archivado: true },
            include: { categoriaNivel1: true },
            orderBy: { nombre: 'asc' },
        });
    }
    async findOne(id) {
        const categoria = await this.prisma.categoriaNivel2.findUnique({
            where: { id },
            include: { categoriaNivel1: true },
        });
        if (!categoria) {
            throw new common_1.NotFoundException(`CategoríaNivel2 con id ${id} no encontrada`);
        }
        return categoria;
    }
    async update(id, updateCategoriaNivel2Dto) {
        await this.findOne(id);
        if (updateCategoriaNivel2Dto.categoriaNivel1Id !== undefined) {
            await this.validarCategoriaNivel1(updateCategoriaNivel2Dto.categoriaNivel1Id);
        }
        return this.prisma.categoriaNivel2.update({
            where: { id },
            data: updateCategoriaNivel2Dto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.categoriaNivel2.update({
            where: { id },
            data: { archivado: true },
        });
    }
    async restore(id) {
        await this.findOne(id);
        return this.prisma.categoriaNivel2.update({
            where: { id },
            data: { archivado: false },
        });
    }
};
exports.CategoriaNivel2Service = CategoriaNivel2Service;
exports.CategoriaNivel2Service = CategoriaNivel2Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriaNivel2Service);
//# sourceMappingURL=categoria-nivel2.service.js.map
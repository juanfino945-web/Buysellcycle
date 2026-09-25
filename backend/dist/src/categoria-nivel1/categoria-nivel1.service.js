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
exports.CategoriaNivel1Service = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriaNivel1Service = class CategoriaNivel1Service {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createCategoriaNivel1Dto) {
        return this.prisma.categoriaNivel1.create({
            data: createCategoriaNivel1Dto,
        });
    }
    findAll() {
        return this.prisma.categoriaNivel1.findMany({
            where: { archivado: false },
            include: { categoriasNivel2: true },
            orderBy: { nombre: 'asc' },
        });
    }
    findAllArchivadas() {
        return this.prisma.categoriaNivel1.findMany({
            where: { archivado: true },
            include: { categoriasNivel2: true },
            orderBy: { nombre: 'asc' },
        });
    }
    async findOne(id) {
        const categoria = await this.prisma.categoriaNivel1.findUnique({
            where: { id },
            include: { categoriasNivel2: true },
        });
        if (!categoria) {
            throw new common_1.NotFoundException(`CategoríaNivel1 con id ${id} no encontrada`);
        }
        return categoria;
    }
    async update(id, updateCategoriaNivel1Dto) {
        await this.findOne(id);
        return this.prisma.categoriaNivel1.update({
            where: { id },
            data: updateCategoriaNivel1Dto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.categoriaNivel1.update({
            where: { id },
            data: { archivado: true },
        });
    }
    async restore(id) {
        await this.findOne(id);
        return this.prisma.categoriaNivel1.update({
            where: { id },
            data: { archivado: false },
        });
    }
};
exports.CategoriaNivel1Service = CategoriaNivel1Service;
exports.CategoriaNivel1Service = CategoriaNivel1Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriaNivel1Service);
//# sourceMappingURL=categoria-nivel1.service.js.map
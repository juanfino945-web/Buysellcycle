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
exports.MarcaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MarcaService = class MarcaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createMarcaDto) {
        return this.prisma.marca.create({ data: createMarcaDto });
    }
    findAll() {
        return this.prisma.marca.findMany({
            where: { archivado: false },
            orderBy: { nombre: 'asc' },
        });
    }
    findAllArchivadas() {
        return this.prisma.marca.findMany({
            where: { archivado: true },
            orderBy: { nombre: 'asc' },
        });
    }
    async findOne(id) {
        const marca = await this.prisma.marca.findUnique({ where: { id } });
        if (!marca) {
            throw new common_1.NotFoundException(`Marca con id ${id} no encontrada`);
        }
        return marca;
    }
    async update(id, updateMarcaDto) {
        await this.findOne(id);
        return this.prisma.marca.update({ where: { id }, data: updateMarcaDto });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.marca.update({
            where: { id },
            data: { archivado: true },
        });
    }
    async restore(id) {
        await this.findOne(id);
        return this.prisma.marca.update({
            where: { id },
            data: { archivado: false },
        });
    }
};
exports.MarcaService = MarcaService;
exports.MarcaService = MarcaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarcaService);
//# sourceMappingURL=marca.service.js.map
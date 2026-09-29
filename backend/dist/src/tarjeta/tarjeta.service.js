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
exports.TarjetaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TarjetaService = class TarjetaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.tarjeta.findMany({
            where: { archivado: false },
            orderBy: { nombre: 'asc' },
        });
    }
    async findOne(id) {
        const tarjeta = await this.prisma.tarjeta.findFirst({
            where: { id, archivado: false },
        });
        if (!tarjeta)
            throw new common_1.NotFoundException(`Tarjeta ${id} no encontrada`);
        return tarjeta;
    }
    create(dto) {
        return this.prisma.tarjeta.create({ data: dto });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.tarjeta.update({ where: { id }, data: dto });
    }
    async archivar(id) {
        await this.findOne(id);
        return this.prisma.tarjeta.update({
            where: { id },
            data: { archivado: true },
        });
    }
    findArchivados() {
        return this.prisma.tarjeta.findMany({
            where: { archivado: true },
            orderBy: { nombre: 'asc' },
        });
    }
    async restaurar(id) {
        const tarjeta = await this.prisma.tarjeta.findFirst({
            where: { id, archivado: true },
        });
        if (!tarjeta)
            throw new common_1.NotFoundException(`Tarjeta ${id} archivada no encontrada`);
        return this.prisma.tarjeta.update({
            where: { id },
            data: { archivado: false },
        });
    }
};
exports.TarjetaService = TarjetaService;
exports.TarjetaService = TarjetaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TarjetaService);
//# sourceMappingURL=tarjeta.service.js.map
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
exports.SucursalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SucursalService = class SucursalService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validarDuplicado(nombre, provinciaId, localidadId, idExcluir) {
        const existente = await this.prisma.sucursal.findFirst({
            where: {
                nombre,
                provinciaId,
                localidadId,
                archivado: false,
                ...(idExcluir ? { id: { not: idExcluir } } : {}),
            },
        });
        if (existente) {
            throw new common_1.ConflictException('ya existe esta sucursal');
        }
    }
    async create(createSucursalDto) {
        await this.validarDuplicado(createSucursalDto.nombre, createSucursalDto.provinciaId, createSucursalDto.localidadId);
        return this.prisma.sucursal.create({ data: createSucursalDto });
    }
    findAll() {
        return this.prisma.sucursal.findMany({
            where: { archivado: false },
            include: { provincia: true, localidad: true },
            orderBy: { nombre: 'asc' },
        });
    }
    findAllArchivadas() {
        return this.prisma.sucursal.findMany({
            where: { archivado: true },
            include: { provincia: true, localidad: true },
            orderBy: { nombre: 'asc' },
        });
    }
    async findOne(id) {
        const sucursal = await this.prisma.sucursal.findUnique({
            where: { id },
            include: { provincia: true, localidad: true },
        });
        if (!sucursal) {
            throw new common_1.NotFoundException(`Sucursal con id ${id} no encontrada`);
        }
        return sucursal;
    }
    async update(id, updateSucursalDto) {
        await this.findOne(id);
        if (updateSucursalDto.nombre ||
            updateSucursalDto.provinciaId ||
            updateSucursalDto.localidadId) {
            await this.validarDuplicado(updateSucursalDto.nombre ?? (await this.findOne(id)).nombre, updateSucursalDto.provinciaId ?? (await this.findOne(id)).provinciaId, updateSucursalDto.localidadId ?? (await this.findOne(id)).localidadId, id);
        }
        return this.prisma.sucursal.update({
            where: { id },
            data: updateSucursalDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.sucursal.update({
            where: { id },
            data: { archivado: true },
        });
    }
    async restore(id) {
        await this.findOne(id);
        return this.prisma.sucursal.update({
            where: { id },
            data: { archivado: false },
        });
    }
};
exports.SucursalService = SucursalService;
exports.SucursalService = SucursalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SucursalService);
//# sourceMappingURL=sucursal.service.js.map
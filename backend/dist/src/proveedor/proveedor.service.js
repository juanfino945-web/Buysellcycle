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
exports.ProveedorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProveedorService = class ProveedorService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProveedorDto) {
        const existente = await this.prisma.proveedor.findUnique({
            where: { cuit: createProveedorDto.cuit },
        });
        if (existente) {
            throw new common_1.ConflictException(`Ya existe un proveedor con el CUIT ${createProveedorDto.cuit}`);
        }
        return this.prisma.proveedor.create({ data: createProveedorDto });
    }
    findAll() {
        return this.prisma.proveedor.findMany({
            where: { archivado: false },
            orderBy: { razonSocial: 'asc' },
        });
    }
    findAllArchivados() {
        return this.prisma.proveedor.findMany({
            where: { archivado: true },
            orderBy: { razonSocial: 'asc' },
        });
    }
    async findOne(id) {
        const proveedor = await this.prisma.proveedor.findUnique({ where: { id } });
        if (!proveedor) {
            throw new common_1.NotFoundException(`Proveedor con id ${id} no encontrado`);
        }
        return proveedor;
    }
    async update(id, updateProveedorDto) {
        await this.findOne(id);
        if (updateProveedorDto.cuit) {
            const existente = await this.prisma.proveedor.findUnique({
                where: { cuit: updateProveedorDto.cuit },
            });
            if (existente && existente.id !== id) {
                throw new common_1.ConflictException(`Ya existe otro proveedor con el CUIT ${updateProveedorDto.cuit}`);
            }
        }
        return this.prisma.proveedor.update({
            where: { id },
            data: updateProveedorDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.proveedor.update({
            where: { id },
            data: { archivado: true },
        });
    }
    async restore(id) {
        await this.findOne(id);
        return this.prisma.proveedor.update({
            where: { id },
            data: { archivado: false },
        });
    }
};
exports.ProveedorService = ProveedorService;
exports.ProveedorService = ProveedorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProveedorService);
//# sourceMappingURL=proveedor.service.js.map
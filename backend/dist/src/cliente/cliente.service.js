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
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClienteService = class ClienteService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validarUnicidad(dni, email, idExcluir) {
        const porDni = await this.prisma.cliente.findUnique({ where: { dni } });
        if (porDni && porDni.id !== idExcluir) {
            throw new common_1.ConflictException(`Ya existe un cliente con el DNI ${dni}`);
        }
        const porEmail = await this.prisma.cliente.findUnique({ where: { email } });
        if (porEmail && porEmail.id !== idExcluir) {
            throw new common_1.ConflictException(`Ya existe un cliente con el email ${email}`);
        }
    }
    async create(createClienteDto) {
        await this.validarUnicidad(createClienteDto.dni, createClienteDto.email);
        return this.prisma.cliente.create({ data: createClienteDto });
    }
    findAll() {
        return this.prisma.cliente.findMany({
            where: { archivado: false },
            include: { provincia: true, localidad: true },
            orderBy: { apellido: 'asc' },
        });
    }
    findAllArchivados() {
        return this.prisma.cliente.findMany({
            where: { archivado: true },
            include: { provincia: true, localidad: true },
            orderBy: { apellido: 'asc' },
        });
    }
    async findOne(id) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id },
            include: { provincia: true, localidad: true },
        });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente con id ${id} no encontrado`);
        }
        return cliente;
    }
    async update(id, updateClienteDto) {
        const clienteActual = await this.findOne(id);
        if (updateClienteDto.dni || updateClienteDto.email) {
            await this.validarUnicidad(updateClienteDto.dni ?? clienteActual.dni, updateClienteDto.email ?? clienteActual.email, id);
        }
        return this.prisma.cliente.update({
            where: { id },
            data: updateClienteDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.cliente.update({
            where: { id },
            data: { archivado: true },
        });
    }
    async restore(id) {
        await this.findOne(id);
        return this.prisma.cliente.update({
            where: { id },
            data: { archivado: false },
        });
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClienteService);
//# sourceMappingURL=cliente.service.js.map
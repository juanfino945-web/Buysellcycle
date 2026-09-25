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
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsuarioService = class UsuarioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validarSucursal(sucursalId) {
        const sucursal = await this.prisma.sucursal.findUnique({
            where: { id: sucursalId },
        });
        if (!sucursal) {
            throw new common_1.NotFoundException(`Sucursal con id ${sucursalId} no encontrada`);
        }
    }
    async validarUnicidad(dni, nombreUsuario, idExcluir) {
        const porDni = await this.prisma.usuario.findUnique({ where: { dni } });
        if (porDni && porDni.id !== idExcluir) {
            throw new common_1.ConflictException(`Ya existe un usuario con el DNI ${dni}`);
        }
        const porNombreUsuario = await this.prisma.usuario.findUnique({
            where: { nombreUsuario },
        });
        if (porNombreUsuario && porNombreUsuario.id !== idExcluir) {
            throw new common_1.ConflictException(`Ya existe un usuario con el nombre de usuario ${nombreUsuario}`);
        }
    }
    async create(createUsuarioDto) {
        await this.validarSucursal(createUsuarioDto.sucursalId);
        await this.validarUnicidad(createUsuarioDto.dni, createUsuarioDto.nombreUsuario);
        return this.prisma.usuario.create({ data: createUsuarioDto });
    }
    findAll() {
        return this.prisma.usuario.findMany({
            where: { archivado: false },
            include: { sucursal: true },
            orderBy: { apellido: 'asc' },
        });
    }
    findAllArchivados() {
        return this.prisma.usuario.findMany({
            where: { archivado: true },
            include: { sucursal: true },
            orderBy: { apellido: 'asc' },
        });
    }
    async findOne(id) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { id },
            include: { sucursal: true },
        });
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        return usuario;
    }
    async update(id, updateUsuarioDto) {
        const usuarioActual = await this.findOne(id);
        if (updateUsuarioDto.sucursalId !== undefined) {
            await this.validarSucursal(updateUsuarioDto.sucursalId);
        }
        if (updateUsuarioDto.dni || updateUsuarioDto.nombreUsuario) {
            await this.validarUnicidad(updateUsuarioDto.dni ?? usuarioActual.dni, updateUsuarioDto.nombreUsuario ?? usuarioActual.nombreUsuario, id);
        }
        return this.prisma.usuario.update({
            where: { id },
            data: updateUsuarioDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.usuario.update({
            where: { id },
            data: { archivado: true },
        });
    }
    async restore(id) {
        await this.findOne(id);
        return this.prisma.usuario.update({
            where: { id },
            data: { archivado: false },
        });
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map
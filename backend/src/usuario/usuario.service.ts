import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  private async validarSucursal(sucursalId: number) {
    const sucursal = await this.prisma.sucursal.findUnique({
      where: { id: sucursalId },
    });
    if (!sucursal) {
      throw new NotFoundException(`Sucursal con id ${sucursalId} no encontrada`);
    }
  }

  private async validarUnicidad(dni: string, nombreUsuario: string, idExcluir?: number) {
    const porDni = await this.prisma.usuario.findUnique({ where: { dni } });
    if (porDni && porDni.id !== idExcluir) {
      throw new ConflictException(`Ya existe un usuario con el DNI ${dni}`);
    }

    const porNombreUsuario = await this.prisma.usuario.findUnique({
      where: { nombreUsuario },
    });
    if (porNombreUsuario && porNombreUsuario.id !== idExcluir) {
      throw new ConflictException(
        `Ya existe un usuario con el nombre de usuario ${nombreUsuario}`,
      );
    }
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    await this.validarSucursal(createUsuarioDto.sucursalId);
    await this.validarUnicidad(
      createUsuarioDto.dni,
      createUsuarioDto.nombreUsuario,
    );

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

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      include: { sucursal: true },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioActual = await this.findOne(id);

    if (updateUsuarioDto.sucursalId !== undefined) {
      await this.validarSucursal(updateUsuarioDto.sucursalId);
    }

    if (updateUsuarioDto.dni || updateUsuarioDto.nombreUsuario) {
      await this.validarUnicidad(
        updateUsuarioDto.dni ?? usuarioActual.dni,
        updateUsuarioDto.nombreUsuario ?? usuarioActual.nombreUsuario,
        id,
      );
    }

    return this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.usuario.update({
      where: { id },
      data: { archivado: true },
    });
  }

  async restore(id: number) {
    await this.findOne(id);
    return this.prisma.usuario.update({
      where: { id },
      data: { archivado: false },
    });
  }
}

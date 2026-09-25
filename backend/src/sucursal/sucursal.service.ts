import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';

@Injectable()
export class SucursalService {
  constructor(private prisma: PrismaService) {}

  private async validarDuplicado(
    nombre: string,
    provinciaId: number,
    localidadId: number,
    idExcluir?: number,
  ) {
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
      throw new ConflictException('ya existe esta sucursal');
    }
  }

  async create(createSucursalDto: CreateSucursalDto) {
    await this.validarDuplicado(
      createSucursalDto.nombre,
      createSucursalDto.provinciaId,
      createSucursalDto.localidadId,
    );

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

  async findOne(id: number) {
    const sucursal = await this.prisma.sucursal.findUnique({
      where: { id },
      include: { provincia: true, localidad: true },
    });

    if (!sucursal) {
      throw new NotFoundException(`Sucursal con id ${id} no encontrada`);
    }

    return sucursal;
  }

  async update(id: number, updateSucursalDto: UpdateSucursalDto) {
    await this.findOne(id);

    if (
      updateSucursalDto.nombre ||
      updateSucursalDto.provinciaId ||
      updateSucursalDto.localidadId
    ) {
      await this.validarDuplicado(
        updateSucursalDto.nombre ?? (await this.findOne(id)).nombre,
        updateSucursalDto.provinciaId ?? (await this.findOne(id)).provinciaId,
        updateSucursalDto.localidadId ?? (await this.findOne(id)).localidadId,
        id,
      );
    }

    return this.prisma.sucursal.update({
      where: { id },
      data: updateSucursalDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.sucursal.update({
      where: { id },
      data: { archivado: true },
    });
  }

  async restore(id: number) {
    await this.findOne(id);
    return this.prisma.sucursal.update({
      where: { id },
      data: { archivado: false },
    });
  }
}

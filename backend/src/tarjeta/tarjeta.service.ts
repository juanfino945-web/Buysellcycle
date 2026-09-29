import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';

@Injectable()
export class TarjetaService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.tarjeta.findMany({
      where: { archivado: false },
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: number) {
    const tarjeta = await this.prisma.tarjeta.findFirst({
      where: { id, archivado: false },
    });
    if (!tarjeta) throw new NotFoundException(`Tarjeta ${id} no encontrada`);
    return tarjeta;
  }

  create(dto: CreateTarjetaDto) {
    return this.prisma.tarjeta.create({ data: dto });
  }

  async update(id: number, dto: UpdateTarjetaDto) {
    await this.findOne(id);
    return this.prisma.tarjeta.update({ where: { id }, data: dto });
  }

  async archivar(id: number) {
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

async restaurar(id: number) {
  const tarjeta = await this.prisma.tarjeta.findFirst({
    where: { id, archivado: true },
  });
  if (!tarjeta) throw new NotFoundException(`Tarjeta ${id} archivada no encontrada`);
  return this.prisma.tarjeta.update({
    where: { id },
    data: { archivado: false },
  });
}
}
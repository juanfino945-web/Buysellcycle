import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Injectable()
export class MarcaService {
  constructor(private prisma: PrismaService) {}

  create(createMarcaDto: CreateMarcaDto) {
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

  async findOne(id: number) {
    const marca = await this.prisma.marca.findUnique({ where: { id } });
    if (!marca) {
      throw new NotFoundException(`Marca con id ${id} no encontrada`);
    }
    return marca;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto) {
    await this.findOne(id);
    return this.prisma.marca.update({ where: { id }, data: updateMarcaDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.marca.update({
      where: { id },
      data: { archivado: true },
    });
  }

  async restore(id: number) {
    await this.findOne(id);
    return this.prisma.marca.update({
      where: { id },
      data: { archivado: false },
    });
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaNivel1Dto } from './dto/create-categoria-nivel1.dto';
import { UpdateCategoriaNivel1Dto } from './dto/update-categoria-nivel1.dto';

@Injectable()
export class CategoriaNivel1Service {
  constructor(private prisma: PrismaService) {}

  create(createCategoriaNivel1Dto: CreateCategoriaNivel1Dto) {
    return this.prisma.categoriaNivel1.create({
      data: createCategoriaNivel1Dto,
    });
  }

  findAll() {
    return this.prisma.categoriaNivel1.findMany({
      where: { archivado: false },
      include: { categoriasNivel2: true },
      orderBy: { nombre: 'asc' },
    });
  }

  findAllArchivadas() {
    return this.prisma.categoriaNivel1.findMany({
      where: { archivado: true },
      include: { categoriasNivel2: true },
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categoriaNivel1.findUnique({
      where: { id },
      include: { categoriasNivel2: true },
    });

    if (!categoria) {
      throw new NotFoundException(`CategoríaNivel1 con id ${id} no encontrada`);
    }

    return categoria;
  }

  async update(id: number, updateCategoriaNivel1Dto: UpdateCategoriaNivel1Dto) {
    await this.findOne(id);
    return this.prisma.categoriaNivel1.update({
      where: { id },
      data: updateCategoriaNivel1Dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.categoriaNivel1.update({
      where: { id },
      data: { archivado: true },
    });
  }

  async restore(id: number) {
    await this.findOne(id);
    return this.prisma.categoriaNivel1.update({
      where: { id },
      data: { archivado: false },
    });
  }
}

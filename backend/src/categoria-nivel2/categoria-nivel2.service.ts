import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaNivel2Dto } from './dto/create-categoria-nivel2.dto';
import { UpdateCategoriaNivel2Dto } from './dto/update-categoria-nivel2.dto';

@Injectable()
export class CategoriaNivel2Service {
  constructor(private prisma: PrismaService) {}

  private async validarCategoriaNivel1(categoriaNivel1Id: number) {
    const padre = await this.prisma.categoriaNivel1.findUnique({
      where: { id: categoriaNivel1Id },
    });
    if (!padre) {
      throw new NotFoundException(
        `CategoríaNivel1 con id ${categoriaNivel1Id} no encontrada`,
      );
    }
  }

  async create(createCategoriaNivel2Dto: CreateCategoriaNivel2Dto) {
    await this.validarCategoriaNivel1(createCategoriaNivel2Dto.categoriaNivel1Id);

    return this.prisma.categoriaNivel2.create({
      data: createCategoriaNivel2Dto,
    });
  }

  findAll() {
    return this.prisma.categoriaNivel2.findMany({
      where: { archivado: false },
      include: { categoriaNivel1: true },
      orderBy: { nombre: 'asc' },
    });
  }

  findAllArchivadas() {
    return this.prisma.categoriaNivel2.findMany({
      where: { archivado: true },
      include: { categoriaNivel1: true },
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categoriaNivel2.findUnique({
      where: { id },
      include: { categoriaNivel1: true },
    });

    if (!categoria) {
      throw new NotFoundException(`CategoríaNivel2 con id ${id} no encontrada`);
    }

    return categoria;
  }

  async update(id: number, updateCategoriaNivel2Dto: UpdateCategoriaNivel2Dto) {
    await this.findOne(id);

    if (updateCategoriaNivel2Dto.categoriaNivel1Id !== undefined) {
      await this.validarCategoriaNivel1(updateCategoriaNivel2Dto.categoriaNivel1Id);
    }

    return this.prisma.categoriaNivel2.update({
      where: { id },
      data: updateCategoriaNivel2Dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.categoriaNivel2.update({
      where: { id },
      data: { archivado: true },
    });
  }

  async restore(id: number) {
    await this.findOne(id);
    return this.prisma.categoriaNivel2.update({
      where: { id },
      data: { archivado: false },
    });
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProvinciaService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.provincia.findMany({
      where: { archivado: false },
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: number) {
    const provincia = await this.prisma.provincia.findUnique({ where: { id } });
    if (!provincia) {
      throw new NotFoundException(`Provincia con id ${id} no encontrada`);
    }
    return provincia;
  }
}

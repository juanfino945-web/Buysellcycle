import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LocalidadService {
  constructor(private prisma: PrismaService) {}

  findAll(provinciaId?: number) {
    return this.prisma.localidad.findMany({
      where: {
        archivado: false,
        ...(provinciaId ? { provinciaId } : {}),
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: number) {
    const localidad = await this.prisma.localidad.findUnique({ where: { id } });
    if (!localidad) {
      throw new NotFoundException(`Localidad con id ${id} no encontrada`);
    }
    return localidad;
  }
}
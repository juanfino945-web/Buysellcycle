import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Injectable()
export class ProveedorService {
  constructor(private prisma: PrismaService) {}

  async create(createProveedorDto: CreateProveedorDto) {
    const existente = await this.prisma.proveedor.findUnique({
      where: { cuit: createProveedorDto.cuit },
    });

    if (existente) {
      throw new ConflictException(
        `Ya existe un proveedor con el CUIT ${createProveedorDto.cuit}`,
      );
    }

    return this.prisma.proveedor.create({ data: createProveedorDto });
  }

  findAll() {
    return this.prisma.proveedor.findMany({
      where: { archivado: false },
      orderBy: { razonSocial: 'asc' },
    });
  }

  findAllArchivados() {
    return this.prisma.proveedor.findMany({
      where: { archivado: true },
      orderBy: { razonSocial: 'asc' },
    });
  }

  async findOne(id: number) {
    const proveedor = await this.prisma.proveedor.findUnique({ where: { id } });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con id ${id} no encontrado`);
    }
    return proveedor;
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto) {
    await this.findOne(id);

    if (updateProveedorDto.cuit) {
      const existente = await this.prisma.proveedor.findUnique({
        where: { cuit: updateProveedorDto.cuit },
      });
      if (existente && existente.id !== id) {
        throw new ConflictException(
          `Ya existe otro proveedor con el CUIT ${updateProveedorDto.cuit}`,
        );
      }
    }

    return this.prisma.proveedor.update({
      where: { id },
      data: updateProveedorDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.proveedor.update({
      where: { id },
      data: { archivado: true },
    });
  }

  async restore(id: number) {
    await this.findOne(id);
    return this.prisma.proveedor.update({
      where: { id },
      data: { archivado: false },
    });
  }
}
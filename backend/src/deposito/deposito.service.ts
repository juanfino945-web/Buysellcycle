import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';

@Injectable()
export class DepositoService {
  constructor(private prisma: PrismaService) {}

  private async generarCodigo(): Promise<string> {
    const cantidad = await this.prisma.deposito.count();
    const siguienteNumero = cantidad + 1;
    return `DEP-${siguienteNumero.toString().padStart(2, '0')}`;
  }

  async create(createDepositoDto: CreateDepositoDto) {
    const codigo = await this.generarCodigo();

    return this.prisma.deposito.create({
      data: {
        ...createDepositoDto,
        codigo,
      },
    });
  }

  findAll() {
    return this.prisma.deposito.findMany({
      where: { archivado: false },
      include: { provincia: true, localidad: true },
      orderBy: { nombre: 'asc' },
    });
  }

  findAllArchivados() {
    return this.prisma.deposito.findMany({
      where: { archivado: true },
      include: { provincia: true, localidad: true },
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: number) {
    const deposito = await this.prisma.deposito.findUnique({
      where: { id },
      include: { provincia: true, localidad: true, stocks: true },
    });

    if (!deposito) {
      throw new NotFoundException(`Depósito con id ${id} no encontrado`);
    }

    return deposito;
  }

  async update(id: number, updateDepositoDto: UpdateDepositoDto) {
    await this.findOne(id); 
    return this.prisma.deposito.update({
      where: { id },
      data: updateDepositoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); 
    return this.prisma.deposito.update({
      where: { id },
      data: { archivado: true }, 
    });
  }

  async restore(id: number) {
    await this.findOne(id);
    return this.prisma.deposito.update({
      where: { id },
      data: { archivado: false },
    });
  }
}

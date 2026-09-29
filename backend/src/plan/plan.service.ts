import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(tarjetaId?: number, bancoId?: number) {
    return this.prisma.plan.findMany({
      where: {
        archivado: false,
        ...(tarjetaId ? { tarjetaId } : {}),
        ...(bancoId ? { bancoId } : {}),
      },
      include: { tarjeta: true, banco: true },
      orderBy: { cantidadCuotas: 'asc' },
    });
  }

  async findOne(id: number) {
    const plan = await this.prisma.plan.findFirst({
      where: { id, archivado: false },
      include: { tarjeta: true, banco: true },
    });
    if (!plan) throw new NotFoundException(`Plan ${id} no encontrado`);
    return plan;
  }

  private async validarRelaciones(tarjetaId: number, bancoId: number) {
    const tarjeta = await this.prisma.tarjeta.findFirst({
      where: { id: tarjetaId, archivado: false },
    });
    if (!tarjeta) throw new NotFoundException(`Tarjeta ${tarjetaId} no encontrada`);

    const banco = await this.prisma.banco.findFirst({
      where: { id: bancoId, archivado: false },
    });
    if (!banco) throw new NotFoundException(`Banco ${bancoId} no encontrado`);
  }

  async create(dto: CreatePlanDto) {
    await this.validarRelaciones(dto.tarjetaId, dto.bancoId);
    try {
      return await this.prisma.plan.create({ data: dto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(
          'Ya existe un plan con esa combinación de tarjeta, banco y cantidad de cuotas',
        );
      }
      throw error;
    }
  }

  async update(id: number, dto: UpdatePlanDto) {
    const actual = await this.findOne(id);
    if (dto.tarjetaId || dto.bancoId) {
      await this.validarRelaciones(dto.tarjetaId ?? actual.tarjetaId, dto.bancoId ?? actual.bancoId);
    }
    try {
      return await this.prisma.plan.update({ where: { id }, data: dto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(
          'Ya existe un plan con esa combinación de tarjeta, banco y cantidad de cuotas',
        );
      }
      throw error;
    }
  }

  async archivar(id: number) {
    await this.findOne(id);
    return this.prisma.plan.update({ where: { id }, data: { archivado: true } });
  }

  findArchivados() {
  return this.prisma.plan.findMany({
    where: { archivado: true },
    include: { tarjeta: true, banco: true },
    orderBy: { cantidadCuotas: 'asc' },
  });
}

async restaurar(id: number) {
  const plan = await this.prisma.plan.findFirst({
    where: { id, archivado: true },
  });
  if (!plan) throw new NotFoundException(`Plan ${id} archivado no encontrado`);
  return this.prisma.plan.update({
    where: { id },
    data: { archivado: false },
  });
}
}
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SimularFinanciacionDto } from './dto/simular-financiacion.dto';

@Injectable()
export class FinanciacionService {
  constructor(private readonly prisma: PrismaService) {}

  calcular(monto: number, tasaFinanciacion: number, cantidadCuotas: number) {
    const montoTotal = monto * (1 + tasaFinanciacion / 100);
    const montoCuota = montoTotal / cantidadCuotas;
    return {
      montoTotal: Math.round(montoTotal * 100) / 100,
      montoCuota: Math.round(montoCuota * 100) / 100,
    };
  }

  async simular(dto: SimularFinanciacionDto) {
  const plan = await this.prisma.plan.findFirst({
    where: { id: dto.planId, archivado: false },
  });
  if (!plan) throw new NotFoundException(`Plan ${dto.planId} no encontrado`);

  if (plan.tarjetaId !== dto.tarjetaId || plan.bancoId !== dto.bancoId) {
    throw new BadRequestException(
      'El plan seleccionado no corresponde a la combinación de tarjeta y banco indicada',
    );
  }

  const { montoTotal, montoCuota } = this.calcular(
    dto.monto,
    Number(plan.tasaFinanciacion),
    plan.cantidadCuotas,
  );

  await this.prisma.simulacionFinanciacion.create({
    data: {
      monto: dto.monto,
      montoTotal,
      montoCuota,
      cantidadCuotas: plan.cantidadCuotas,
      tasaFinanciacion: plan.tasaFinanciacion,
      tarjetaId: dto.tarjetaId,
      bancoId: dto.bancoId,
      planId: dto.planId,
    },
  });

  return {
    montoTotal,
    montoCuota,
    cantidadCuotas: plan.cantidadCuotas,
    tasaFinanciacion: Number(plan.tasaFinanciacion),
  };
}

historial() {
  return this.prisma.simulacionFinanciacion.findMany({
    include: { tarjeta: true, banco: true, plan: true },
    orderBy: { fechaCreacion: 'desc' },
    take: 50,
  });
}
}
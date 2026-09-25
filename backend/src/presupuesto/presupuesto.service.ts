import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePresupuestoDto } from './dto/create-presupuesto.dto';

@Injectable()
export class PresupuestoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePresupuestoDto) {
    const { clienteId, items } = dto;

    // Validar que el cliente exista
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: clienteId },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${clienteId} no encontrado`);
    }

    // Traer todos los productos involucrados de una sola vez
    const productoIds = items.map((i) => i.productoId);
    const productos = await this.prisma.producto.findMany({
      where: { id: { in: productoIds } },
    });

    // Validar que todos existan
    for (const item of items) {
      const existe = productos.find((p) => p.id === item.productoId);
      if (!existe) {
        throw new NotFoundException(
          `Producto con id ${item.productoId} no encontrado`,
        );
      }
    }

    // Calcular cada ítem usando el Precio de Lista vigente
    const itemsCalculados = items.map((item) => {
      const producto = productos.find((p) => p.id === item.productoId)!;
      const precioUnitario = Number(producto.precioLista);
      const subtotal = Math.round(precioUnitario * item.cantidad * 100) / 100;

      return {
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioUnitario,
        subtotal,
      };
    });

    const total = itemsCalculados.reduce((acc, i) => acc + i.subtotal, 0);

    // Crear el presupuesto y sus items en una sola transacción
    return this.prisma.presupuesto.create({
      data: {
        clienteId,
        total,
        items: {
          create: itemsCalculados,
        },
      },
      include: {
        cliente: true,
        items: { include: { producto: true } },
      },
    });
  }

  findAll() {
    return this.prisma.presupuesto.findMany({
      where: { archivado: false },
      include: { cliente: true, items: { include: { producto: true } } },
      orderBy: { fechaEmision: 'desc' },
    });
  }

  findAllArchivados() {
    return this.prisma.presupuesto.findMany({
      where: { archivado: true },
      include: { cliente: true, items: { include: { producto: true } } },
      orderBy: { fechaEmision: 'desc' },
    });
  }

  async findOne(id: number) {
    const presupuesto = await this.prisma.presupuesto.findUnique({
      where: { id },
      include: { cliente: true, items: { include: { producto: true } } },
    });

    if (!presupuesto) {
      throw new NotFoundException(`Presupuesto con id ${id} no encontrado`);
    }

    return presupuesto;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.presupuesto.update({
      where: { id },
      data: { archivado: true },
      include: { cliente: true, items: { include: { producto: true } } },
    });
  }

  async restore(id: number) {
    await this.findOne(id);
    return this.prisma.presupuesto.update({
      where: { id },
      data: { archivado: false },
      include: { cliente: true, items: { include: { producto: true } } },
    });
  }
}

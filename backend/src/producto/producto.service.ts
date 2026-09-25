import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ProductoService {
  constructor(private prisma: PrismaService) {}

  // Calcula precioLista y precioContado a partir de costoNeto, utilidad y descuento
  private calcularPrecios(
    costoNeto: number,
    utilidadPorcentaje: number,
    descuentoContadoPorcentaje: number,
  ) {
    const precioLista = costoNeto + (costoNeto * utilidadPorcentaje) / 100;
    const precioContado =
      precioLista - (precioLista * descuentoContadoPorcentaje) / 100;

    // Redondeamos a 2 decimales para evitar arrastrar errores de coma flotante
    return {
      precioLista: Math.round(precioLista * 100) / 100,
      precioContado: Math.round(precioContado * 100) / 100,
    };
  }

  async create(createProductoDto: CreateProductoDto) {
    const { costoNeto, utilidadPorcentaje, descuentoContadoPorcentaje } =
      createProductoDto;

    const { precioLista, precioContado } = this.calcularPrecios(
      costoNeto,
      utilidadPorcentaje,
      descuentoContadoPorcentaje,
    );

    return this.prisma.producto.create({
      data: {
        ...createProductoDto,
        precioLista,
        precioContado,
        stockTotal: 0, // arranca en 0, se carga stock después vía StockProductoDeposito
        estado: 'DISPONIBLE',
      },
    });
  }

  findAll() {
    return this.prisma.producto.findMany({
      where: { archivado: false },
      include: { marca: true, categoriaNivel2: true },
      orderBy: { nombre: 'asc' },
    });
  }

  findAllArchivados() {
    return this.prisma.producto.findMany({
      where: { archivado: true },
      include: { marca: true, categoriaNivel2: true },
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: number) {
    const producto = await this.prisma.producto.findUnique({
      where: { id },
      include: { marca: true, categoriaNivel2: true, stocks: true },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    // Traemos el producto actual para tener los valores base y poder recalcular
    const productoActual = await this.findOne(id);

    const costoNeto = updateProductoDto.costoNeto ?? Number(productoActual.costoNeto);
    const utilidadPorcentaje =
      updateProductoDto.utilidadPorcentaje ?? Number(productoActual.utilidadPorcentaje);
    const descuentoContadoPorcentaje =
      updateProductoDto.descuentoContadoPorcentaje ??
      Number(productoActual.descuentoContadoPorcentaje);

    // Si tocaron cualquiera de los 3 campos que afectan el precio, recalculamos
    const afectaPrecio =
      updateProductoDto.costoNeto !== undefined ||
      updateProductoDto.utilidadPorcentaje !== undefined ||
      updateProductoDto.descuentoContadoPorcentaje !== undefined;

    const precios = afectaPrecio
      ? this.calcularPrecios(costoNeto, utilidadPorcentaje, descuentoContadoPorcentaje)
      : {};

    return this.prisma.producto.update({
      where: { id },
      data: {
        ...updateProductoDto,
        ...precios,
      },
    });
  }

  async remove(id: number) {
    // Archivado lógico en vez de delete físico, para no perder historial
    await this.findOne(id); // valida que exista, si no tira 404
    return this.prisma.producto.update({
      where: { id },
      data: { archivado: true },
    });
  }

  async restore(id: number) {
    await this.findOne(id);
    return this.prisma.producto.update({
      where: { id },
      data: { archivado: false },
    });
  }
//metodo cron
  @Cron(CronExpression.EVERY_HOUR)
async actualizarEstadosPorInactividad() {
  const ahora = new Date();

  const productosSinStock = await this.prisma.producto.findMany({
    where: {
      stockTotal: 0,
      archivado: false,
      fechaHoraUltimoMovimientoStock: { not: null },
    },
  });

  for (const producto of productosSinStock) {
    const diasSinMovimiento = Math.floor(
      (ahora.getTime() - producto.fechaHoraUltimoMovimientoStock!.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    let nuevoEstado: 'DISPONIBLE' | 'ACTIVO' | 'INACTIVO' | null = null;

    if (diasSinMovimiento >= 15) {
      nuevoEstado = 'INACTIVO';
    } else if (diasSinMovimiento >= 7) {
      nuevoEstado = 'ACTIVO';
    }

    if (nuevoEstado && nuevoEstado !== producto.estado) {
      await this.prisma.producto.update({
        where: { id: producto.id },
        data: { estado: nuevoEstado },
      });
    }
  }
}
}
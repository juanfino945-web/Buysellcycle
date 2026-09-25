import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovimientoStockDto } from './dto/movimiento-stock.dto';
import { TransferenciaStockDto } from './dto/transferencia-stock.dto';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  // Recalcula el stockTotal de un producto sumando todas sus filas de stock
  private async recalcularStockTotal(productoId: number, tx = this.prisma) {
    const stocks = await tx.stockProductoDeposito.findMany({
      where: { productoId, archivado: false },
    });

    const stockTotal = stocks.reduce((acc, s) => acc + s.stock, 0);

    await tx.producto.update({
      where: { id: productoId },
      data: {
        stockTotal,
        fechaHoraUltimoMovimientoStock: new Date(),
      },
    });

    return stockTotal;
  }

  // Busca la fila de stock para un producto + depósito (la crea si no existe)
  private async obtenerOCrearFilaStock(
    productoId: number,
    depositoId: number,
    tx = this.prisma,
  ) {
    let fila = await tx.stockProductoDeposito.findUnique({
      where: { productoId_depositoId: { productoId, depositoId } },
    });

    if (!fila) {
      fila = await tx.stockProductoDeposito.create({
        data: { productoId, depositoId, stock: 0 },
      });
    }

    return fila;
  }

  private async validarProductoYDeposito(productoId: number, depositoId: number) {
    const producto = await this.prisma.producto.findUnique({ where: { id: productoId } });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
    }

    const deposito = await this.prisma.deposito.findUnique({ where: { id: depositoId } });
    if (!deposito) {
      throw new NotFoundException(`Depósito con id ${depositoId} no encontrado`);
    }
  }

  findAll() {
  return this.prisma.stockProductoDeposito.findMany({
    where: { archivado: false, stock: { gt: 0 } },
    include: {
      producto: { select: { id: true, nombre: true } },
      deposito: { select: { id: true, nombre: true, codigo: true } },
    },
    orderBy: { fechaActualizacion: 'desc' },
  });
}
  // Ingreso
  async ingreso(dto: MovimientoStockDto) {
    const { productoId, depositoId, cantidad } = dto;
    await this.validarProductoYDeposito(productoId, depositoId);

    return this.prisma.$transaction(async (tx) => {
      const fila = await this.obtenerOCrearFilaStock(productoId, depositoId, tx as any);

      await tx.stockProductoDeposito.update({
        where: { id: fila.id },
        data: { stock: fila.stock + cantidad, ultimoMovimiento: 'INGRESO' },
      });

      const stockTotal = await this.recalcularStockTotal(productoId, tx as any);

      return {
        mensaje: 'Ingreso registrado correctamente',
        productoId,
        depositoId,
        stockDeposito: fila.stock + cantidad,
        stockTotal,
      };
    });
  }

  // Egreso
  async egreso(dto: MovimientoStockDto) {
    const { productoId, depositoId, cantidad } = dto;
    await this.validarProductoYDeposito(productoId, depositoId);

    return this.prisma.$transaction(async (tx) => {
      const fila = await this.obtenerOCrearFilaStock(productoId, depositoId, tx as any);

      if (fila.stock < cantidad) {
        throw new BadRequestException(
          `Stock insuficiente en el depósito. Disponible: ${fila.stock}, solicitado: ${cantidad}`,
        );
      }

      await tx.stockProductoDeposito.update({
      where: { id: fila.id },
      data: { stock: fila.stock - cantidad, ultimoMovimiento: 'EGRESO' },
      });

      const stockTotal = await this.recalcularStockTotal(productoId, tx as any);

      return {
        mensaje: 'Egreso registrado correctamente',
        productoId,
        depositoId,
        stockDeposito: fila.stock - cantidad,
        stockTotal,
      };
    });
  }

  // Transferencia
  async transferencia(dto: TransferenciaStockDto) {
    const { productoId, depositoOrigenId, depositoDestinoId, cantidad } = dto;

    if (depositoOrigenId === depositoDestinoId) {
      throw new BadRequestException(
        'El depósito origen y destino no pueden ser el mismo',
      );
    }

    await this.validarProductoYDeposito(productoId, depositoOrigenId);
    await this.validarProductoYDeposito(productoId, depositoDestinoId);

    return this.prisma.$transaction(async (tx) => {
      
      // Egreso del depósito origen
      const filaOrigen = await this.obtenerOCrearFilaStock(
        productoId,
        depositoOrigenId,
        tx as any,
      );

      if (filaOrigen.stock < cantidad) {
        throw new BadRequestException(
          `Stock insuficiente en el deposito origen. Disponible: ${filaOrigen.stock}, solicitado: ${cantidad}`,
        );
      }

      await tx.stockProductoDeposito.update({
        where: { id: filaOrigen.id },
        data: { stock: filaOrigen.stock - cantidad, ultimoMovimiento: 'TRANSFERENCIA_ORIGEN' },
      });

      // Ingreso al depósito destino
      const filaDestino = await this.obtenerOCrearFilaStock(
        productoId,
        depositoDestinoId,
        tx as any,
      );

     await tx.stockProductoDeposito.update({
      where: { id: filaDestino.id },
      data: { stock: filaDestino.stock + cantidad, ultimoMovimiento: 'TRANSFERENCIA_DESTINO' },
      });

  
      await tx.producto.update({
        where: { id: productoId },
        data: { fechaHoraUltimoMovimientoStock: new Date() },
      });

      return {
        mensaje: 'Transferencia registrada correctamente',
        productoId,
        depositoOrigenId,
        depositoDestinoId,
        stockOrigenRestante: filaOrigen.stock - cantidad,
        stockDestinoActual: filaDestino.stock + cantidad,
      };

      
    });
  }
}


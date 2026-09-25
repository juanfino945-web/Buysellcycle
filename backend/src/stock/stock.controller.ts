import { Body, Controller, Post, Get } from '@nestjs/common';
import { StockService } from './stock.service';
import { MovimientoStockDto } from './dto/movimiento-stock.dto';
import { TransferenciaStockDto } from './dto/transferencia-stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('ingreso')
  ingreso(@Body() dto: MovimientoStockDto) {
    return this.stockService.ingreso(dto);
  }

  @Post('egreso')
  egreso(@Body() dto: MovimientoStockDto) {
    return this.stockService.egreso(dto);
  }

  @Post('transferencia')
  transferencia(@Body() dto: TransferenciaStockDto) {
    return this.stockService.transferencia(dto);
  }

  @Get()
  findAll() {
  return this.stockService.findAll();
}
}

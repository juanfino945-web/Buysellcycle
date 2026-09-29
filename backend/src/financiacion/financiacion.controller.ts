import { Body, Controller, Get, Post, HttpCode } from '@nestjs/common';
import { FinanciacionService } from './financiacion.service';
import { SimularFinanciacionDto } from './dto/simular-financiacion.dto';

@Controller('financiacion')
export class FinanciacionController {
  constructor(private readonly financiacionService: FinanciacionService) {}

  @Get('historial')
  historial() {
   return this.financiacionService.historial();
  }

  @Post('simular')
  @HttpCode(200)
  simular(@Body() dto: SimularFinanciacionDto) {
    return this.financiacionService.simular(dto);
  }
}
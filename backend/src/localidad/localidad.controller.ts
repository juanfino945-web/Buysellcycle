import { Controller, Get, Param, Query } from '@nestjs/common';
import { LocalidadService } from './localidad.service';

@Controller('localidad')
export class LocalidadController {
  constructor(private readonly localidadService: LocalidadService) {}

  @Get()
  findAll(@Query('provinciaId') provinciaId?: string) {
    return this.localidadService.findAll(provinciaId ? +provinciaId : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localidadService.findOne(+id);
  }
}
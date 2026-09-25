import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { PresupuestoService } from './presupuesto.service';
import { CreatePresupuestoDto } from './dto/create-presupuesto.dto';

@Controller('presupuesto')
export class PresupuestoController {
  constructor(private readonly presupuestoService: PresupuestoService) {}

  @Post()
  create(@Body() dto: CreatePresupuestoDto) {
    return this.presupuestoService.create(dto);
  }

  @Get()
  findAll() {
    return this.presupuestoService.findAll();
  }

  @Get('archivados')
  findAllArchivados() {
    return this.presupuestoService.findAllArchivados();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.presupuestoService.findOne(id);
  }

  @Patch(':id/restaurar')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.presupuestoService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.presupuestoService.remove(id);
  }
}

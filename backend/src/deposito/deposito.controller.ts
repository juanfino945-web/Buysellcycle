import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepositoService } from './deposito.service';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';

@Controller('deposito')
export class DepositoController {
  constructor(private readonly depositoService: DepositoService) {}

  @Post()
  create(@Body() createDepositoDto: CreateDepositoDto) {
    return this.depositoService.create(createDepositoDto);
  }

  @Get()
  findAll() {
    return this.depositoService.findAll();
  }

  @Get('archivados')
  findAllArchivados() {
    return this.depositoService.findAllArchivados();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depositoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepositoDto: UpdateDepositoDto) {
    return this.depositoService.update(+id, updateDepositoDto);
  }

  @Patch(':id/restaurar')
  restore(@Param('id') id: string) {
    return this.depositoService.restore(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depositoService.remove(+id);
  }
}

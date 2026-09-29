import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BancoService } from './banco.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';

@Controller('bancos')
export class BancoController {
  constructor(private readonly bancoService: BancoService) {}

  @Get()
  findAll() {
    return this.bancoService.findAll();
  }

 @Get('archivados')
  findArchivados() {
    return this.bancoService.findArchivados();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bancoService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBancoDto) {
    return this.bancoService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBancoDto) {
    return this.bancoService.update(id, dto);
  }

 @Patch(':id/restaurar')
  restaurar(@Param('id', ParseIntPipe) id: number) {
    return this.bancoService.restaurar(id);
  }

  @Delete(':id')
  archivar(@Param('id', ParseIntPipe) id: number) {
    return this.bancoService.archivar(id);
  }
}
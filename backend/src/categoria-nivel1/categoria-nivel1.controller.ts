import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaNivel1Service } from './categoria-nivel1.service';
import { CreateCategoriaNivel1Dto } from './dto/create-categoria-nivel1.dto';
import { UpdateCategoriaNivel1Dto } from './dto/update-categoria-nivel1.dto';

@Controller('categoria-nivel1')
export class CategoriaNivel1Controller {
  constructor(private readonly categoriaNivel1Service: CategoriaNivel1Service) {}

  @Post()
  create(@Body() createCategoriaNivel1Dto: CreateCategoriaNivel1Dto) {
    return this.categoriaNivel1Service.create(createCategoriaNivel1Dto);
  }

  @Get()
  findAll() {
    return this.categoriaNivel1Service.findAll();
  }

  @Get('archivadas')
  findAllArchivadas() {
    return this.categoriaNivel1Service.findAllArchivadas();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaNivel1Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaNivel1Dto: UpdateCategoriaNivel1Dto) {
    return this.categoriaNivel1Service.update(+id, updateCategoriaNivel1Dto);
  }

  @Patch(':id/restaurar')
  restore(@Param('id') id: string) {
    return this.categoriaNivel1Service.restore(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaNivel1Service.remove(+id);
  }
}

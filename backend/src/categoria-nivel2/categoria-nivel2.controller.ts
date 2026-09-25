import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaNivel2Service } from './categoria-nivel2.service';
import { CreateCategoriaNivel2Dto } from './dto/create-categoria-nivel2.dto';
import { UpdateCategoriaNivel2Dto } from './dto/update-categoria-nivel2.dto';

@Controller('categoria-nivel2')
export class CategoriaNivel2Controller {
  constructor(private readonly categoriaNivel2Service: CategoriaNivel2Service) {}

  @Post()
  create(@Body() createCategoriaNivel2Dto: CreateCategoriaNivel2Dto) {
    return this.categoriaNivel2Service.create(createCategoriaNivel2Dto);
  }

  @Get()
  findAll() {
    return this.categoriaNivel2Service.findAll();
  }

  @Get('archivadas')
  findAllArchivadas() {
    return this.categoriaNivel2Service.findAllArchivadas();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaNivel2Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaNivel2Dto: UpdateCategoriaNivel2Dto) {
    return this.categoriaNivel2Service.update(+id, updateCategoriaNivel2Dto);
  }

  @Patch(':id/restaurar')
  restore(@Param('id') id: string) {
    return this.categoriaNivel2Service.restore(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaNivel2Service.remove(+id);
  }
}

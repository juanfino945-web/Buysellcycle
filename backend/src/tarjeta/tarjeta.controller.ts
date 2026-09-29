import { Body,Controller,Delete,Get,Param,ParseIntPipe,Patch,Post} from '@nestjs/common';
import { TarjetaService } from './tarjeta.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';

@Controller('tarjetas')
export class TarjetaController {
  constructor(private readonly tarjetaService: TarjetaService) {}

  @Get()
  findAll() {
    return this.tarjetaService.findAll();
  }

  @Get('archivadas')
  findArchivados() {
    return this.tarjetaService.findArchivados();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tarjetaService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTarjetaDto) {
    return this.tarjetaService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTarjetaDto) {
    return this.tarjetaService.update(id, dto);
  }

  @Patch(':id/restaurar')
  restaurar(@Param('id', ParseIntPipe) id: number) {
    return this.tarjetaService.restaurar(id);
  }

  @Delete(':id')
  archivar(@Param('id', ParseIntPipe) id: number) {
    return this.tarjetaService.archivar(id);
  }
}
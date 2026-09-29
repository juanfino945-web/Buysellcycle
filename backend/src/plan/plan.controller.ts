import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Controller('planes')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  findAll(
    @Query('tarjetaId') tarjetaId?: string,
    @Query('bancoId') bancoId?: string,
  ) {
    return this.planService.findAll(
      tarjetaId ? Number(tarjetaId) : undefined,
      bancoId ? Number(bancoId) : undefined,
    );
  }

  @Get('archivados')
  findArchivados() {
    return this.planService.findArchivados();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.planService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePlanDto) {
    return this.planService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlanDto) {
    return this.planService.update(id, dto);
  }

  @Patch(':id/restaurar')
  restaurar(@Param('id', ParseIntPipe) id: number) {
    return this.planService.restaurar(id);
  }

  @Delete(':id')
  archivar(@Param('id', ParseIntPipe) id: number) {
    return this.planService.archivar(id);
  }
}
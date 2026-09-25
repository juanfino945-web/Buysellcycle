import {
  IsInt,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class PresupuestoItemDto {
  @IsInt()
  productoId!: number;

  @IsInt()
  @Min(1)
  cantidad!: number;
}

export class CreatePresupuestoDto {
  @IsInt()
  @Min(1)
  clienteId!: number;

  @IsArray()
  @ArrayMinSize(1) // un presupuesto necesita al menos 1 producto
  @ValidateNested({ each: true })
  @Type(() => PresupuestoItemDto)
  items!: PresupuestoItemDto[];
}
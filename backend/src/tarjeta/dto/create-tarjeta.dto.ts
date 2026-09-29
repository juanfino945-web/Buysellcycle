import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TipoTarjeta } from '@prisma/client';

export class CreateTarjetaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre!: string;

  @IsEnum(TipoTarjeta)
  tipo!: TipoTarjeta;
}
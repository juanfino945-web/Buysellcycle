import { IsInt, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreatePlanDto {
  @IsInt()
  @IsPositive()
  tarjetaId!: number;

  @IsInt()
  @IsPositive()
  bancoId!: number;

  @IsInt()
  @IsPositive()
  cantidadCuotas!: number;

  @IsNumber()
  @Min(0)
  tasaFinanciacion!: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
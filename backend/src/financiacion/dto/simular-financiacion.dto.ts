import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class SimularFinanciacionDto {
  @IsNumber()
  @IsPositive()
  monto!: number;

  @IsInt()
  @IsPositive()
  tarjetaId!: number;

  @IsInt()
  @IsPositive()
  bancoId!: number;

  @IsInt()
  @IsPositive()
  planId!: number;
}
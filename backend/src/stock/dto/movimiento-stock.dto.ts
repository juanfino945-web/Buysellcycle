import { IsInt, Min } from 'class-validator';

export class MovimientoStockDto {
  @IsInt()
  @Min(1)
  productoId!: number;

  @IsInt()
  @Min(1)
  depositoId!: number;

  @IsInt()
  @Min(1)
  cantidad!: number;
}
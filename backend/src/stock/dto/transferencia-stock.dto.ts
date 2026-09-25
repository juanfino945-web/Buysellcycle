import { IsInt, Min } from 'class-validator';

export class TransferenciaStockDto {
  @IsInt()
  @Min(1)
  productoId!: number;

  @IsInt()
  @Min(1)
  depositoOrigenId!: number;

  @IsInt()
  @Min(1)
  depositoDestinoId!: number;

  @IsInt()
  @Min(1)
  cantidad!: number;
}
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  costoNeto!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1000) // % de utilidad, ajustable según reglas de negocio reales
  utilidadPorcentaje!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100) // % de descuento, no puede superar el 100%
  descuentoContadoPorcentaje!: number;

  @IsInt()
  @Min(1)
  marcaId!: number;

  @IsInt()
  @Min(1)
  categoriaNivel2Id!: number;

  @IsOptional()
  @IsString()
  rutaImagenStorage?: string;
}
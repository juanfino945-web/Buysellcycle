import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateDepositoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsInt()
  @Min(1)
  provinciaId!: number;

  @IsInt()
  @Min(1)
  localidadId!: number;
}

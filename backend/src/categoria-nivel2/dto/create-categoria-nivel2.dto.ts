import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateCategoriaNivel2Dto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsInt()
  @Min(1)
  categoriaNivel1Id!: number;
}

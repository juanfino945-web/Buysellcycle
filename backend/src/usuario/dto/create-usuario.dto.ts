import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsIn,
  Min,
  Matches,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  apellido!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, {
    message: 'El DNI no admite letras. Solo se permiten números.',
  })
  @Matches(/^\d{8}$/, {
    message: 'El DNI debe tener exactamente 8 números.',
  })
  dni!: string;

  @IsString()
  @IsNotEmpty()
  nombreUsuario!: string;

  @IsIn(['ADMINISTRACION', 'VENDEDOR'])
  rol!: 'ADMINISTRACION' | 'VENDEDOR';

  @IsInt()
  @Min(1)
  sucursalId!: number;
}
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsInt,
  Min,
  Matches,
} from 'class-validator';

export class CreateClienteDto {
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

  @IsEmail()
  email!: string;

  @IsInt()
  @Min(1)
  provinciaId!: number;

  @IsInt()
  @Min(1)
  localidadId!: number;
}

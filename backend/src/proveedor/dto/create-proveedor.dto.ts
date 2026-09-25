import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  @IsNotEmpty()
  razonSocial!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}-\d{8}-\d{1}$/, {
    message: 'El CUIT debe tener el formato XX-XXXXXXXX-X',
  })
  cuit!: string;
}

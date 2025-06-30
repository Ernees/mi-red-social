import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido: string;

  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  nombreUsuario: string;
  perfil: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15, {
    message: 'La contraseña no puede tener más de 15 caracteres',
  })
  password: string;

  @IsOptional()
  passwordRepetida?: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @IsDateString({}, { message: 'Debe ser una fecha válida (YYYY-MM-DD)' })
  fNac: string;

  @IsOptional()
  @MaxLength(255, {
    message: 'La descripción no puede superar los 255 caracteres',
  })
  descripcion?: string;

  @IsOptional()
  foto?: string;
}

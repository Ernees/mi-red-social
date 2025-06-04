/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
  foto?: string;
}

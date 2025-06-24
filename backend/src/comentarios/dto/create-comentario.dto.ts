import { IsNotEmpty, IsString } from 'class-validator';

export class CreateComentarioDto {
  @IsNotEmpty()
  @IsString()
  contenido: string;

  @IsNotEmpty()
  @IsString()
  usuarioId: string;

  @IsNotEmpty()
  @IsString()
  publicacionId: string;
}

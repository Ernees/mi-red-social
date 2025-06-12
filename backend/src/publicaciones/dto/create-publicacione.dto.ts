import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreatePublicacioneDto {
  //cuando lo traiga el back se elimina el ususairoID
  @IsNotEmpty({ message: 'El id es obligatorio' })
  usuarioId: string;

  @IsNotEmpty({ message: 'El titulo es obligatorio' })
  titulo: string;

  @IsNotEmpty({ message: 'El mensaje es obligatorio' })
  mensaje: string;

  @IsOptional()
  imagen: string;
}

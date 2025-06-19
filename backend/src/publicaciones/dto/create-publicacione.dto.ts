import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreatePublicacioneDto {
  @IsOptional()
  usuarioId: string;

  @IsNotEmpty({ message: 'El título es obligatorio' })
  titulo: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @IsOptional()
  urlImagen?: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateComentarioDto } from './create-comentario.dto';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {
  @IsString()
  @IsNotEmpty()
  @MaxLength(144)
  contenido?: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateComentarioDto } from './create-comentario.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {
  @IsOptional()
  @IsString()
  texto?: string;
}

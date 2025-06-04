/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

// Schema / Modelo
@Schema()
export class Usuario {
  _id?: ObjectId;

  @Prop({ required: true })
  @IsNotEmpty()
  nombre: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @MinLength(8)
  password: string;
}
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

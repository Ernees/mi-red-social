/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
  _id?: ObjectId;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, default: 'admin' })
  rol: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true, unique: true })
  nombreUsuario: string;

  @Prop({ required: true })
  fNac: string;

  @Prop({ required: true })
  descripcion?: string;

  @Prop({ required: true })
  foto?: string;

  @Prop({ default: true })
  activo: boolean;
}
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

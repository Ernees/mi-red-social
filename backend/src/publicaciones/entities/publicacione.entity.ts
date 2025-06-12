import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type PublicacionDocument = HydratedDocument<Publicacion>;
@Schema({ timestamps: true })
export class Publicacion {
  @Prop()
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop()
  urlImagen?: string;

  @Prop()
  usuarioId: string;

  @Prop({ default: [] })
  comentarios: {
    usuarioId: string;
    texto: string;
    fecha: Date;
  }[];

  @Prop({ default: [] })
  likes: string[]; // array de userids

  @Prop()
  fecha: Date;

  @Prop({ default: true })
  activa: boolean;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);

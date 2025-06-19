import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type PublicacionDocument = HydratedDocument<Publicacion>;
@Schema({ timestamps: true })
export class Publicacion {
  @Prop()
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop()
  urlImagen?: string;

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  usuarioId: Types.ObjectId;

  @Prop({ default: [] })
  comentarios: {
    usuarioId: string;
    texto: string;
    fecha: Date;
  }[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Usuario' }], default: [] })
  likes: Types.ObjectId[];

  @Prop({ default: true })
  activa: boolean;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);

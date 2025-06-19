import { ComentarioModel } from './comentario.model';
export interface PublicacionModel {
  _id: string;
  titulo: string;
  descripcion: string;
  urlImagen?: string;
  usuarioId: string;
  comentarios: ComentarioModel[];
  likes: string[];
  activa: boolean;
  createdAt: Date;
  updatedAt: Date;
}

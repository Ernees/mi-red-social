export interface PublicacionModel {
  _id: string;
  titulo: string;
  descripcion: string;
  urlImagen?: string;
  usuarioId: string;
  likes: string[];
  activa: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComentarioModel {
  _id: string;
  contenido: string;
  usuarioId: string;
  publicacionId: string;
  modificado: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ComentarioModel {
  _id: string;
  contenido: string;
  usuarioId: {
    _id: string;
    nombre: string;
  };
  publicacionId: string;
  modificado: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ComentarioCrear {
  contenido: string;
  usuarioId: string; // solo id para crear
  publicacionId: string;
}

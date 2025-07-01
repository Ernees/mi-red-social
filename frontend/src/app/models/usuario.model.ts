export interface UsuarioModel {
  _id?: string;
  nombre: string;
  apellido: string;
  email: string;
  perfil: string;
  password: string;
  nombreUsuario: string;
  fNac: string;
  descripcion?: string;
  foto?: string;
  activo: boolean;
  rol: string;
}

import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutenticacionService {
  constructor(private usuariosService: UsuariosService) {}

  async registrar(dto: CreateUsuarioDto) {
    const usuarioExistente = await this.usuariosService.buscarPorEmail(
      dto.email,
    );
    if (usuarioExistente) {
      throw new BadRequestException('El email ya está registrado');
    }

    return this.usuariosService.crear(dto);
  }
  //va aca el tema de la foto?
  async login(email: string, password: string): Promise<any> {
    //cambiar el any
    const user = await this.usuariosService.buscarPorEmail(email);

    if (!user) {
      console.log('No hay usuario con ese nombre');
      throw new UnauthorizedException('Usuario no encontrado'); // esta linea hace que se asegure que el user no va a ser null en lo que sigue del flujo del metodo
    }

    if (!user.password) {
      throw new UnauthorizedException('Usuario sin contraseña');
    }

    const coinciden = await bcrypt.compare(password, user.password);
    if (!coinciden) {
      throw new UnauthorizedException(`Contraseña incorrecta`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userSinPassword } = user;
    return userSinPassword;
  }
}

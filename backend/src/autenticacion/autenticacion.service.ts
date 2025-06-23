/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacionService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async registrar(dto: CreateUsuarioDto) {
    const usuarioExistente = await this.usuariosService.buscarPorEmail(
      dto.email,
    );
    if (usuarioExistente) {
      throw new BadRequestException('El email ya está registrado');
    }

    const user = await this.usuariosService.crear(dto);
    const payload = {
      sub: user._id,
      username: user.nombreUsuario,
      perfil: user.perfil,
    };
    const token = await this.jwtService.signAsync(payload);
    return { user, token };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usuariosService.buscarPorEmail(email);

    if (!user) {
      console.log('No hay usuario con ese nombre');
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!user.password) {
      throw new UnauthorizedException('Usuario sin contraseña');
    }

    const coinciden = await bcrypt.compare(password, user.password);
    if (!coinciden) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = {
      sub: user._id,
      username: user.nombreUsuario,
      perfil: user.perfil,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      //agregar user? como en registro
    };
  }
  verificarToken(token: string) {
    if (!token) {
      //UnauthorizedException es error 401
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException(`Token inválido o expirado ${error}`);
    }
  }
}

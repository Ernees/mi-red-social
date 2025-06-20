/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UsuariosService } from './usuarios.service';
import { Get, Controller, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/guards/logeado-guard/logeado-guard.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('perfil')
  async obtenerPerfil(@Req() req) {
    const usuarioId = req.usuario.sub;
    const usuario = await this.usuariosService.buscarPorId(usuarioId);

    if (!usuario) return null;

    const { password, ...datosSinPassword } = usuario;
    return datosSinPassword;
  }
}

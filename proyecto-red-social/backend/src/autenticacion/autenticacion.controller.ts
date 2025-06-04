import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly authService: AutenticacionService) {}

  @Post('registro')
  async registrar(@Body() dto: CreateUsuarioDto) {
    return this.authService.registrar(dto);
  }
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.authService.login(body.email, body.password);
  }
}

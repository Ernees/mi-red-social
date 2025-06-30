/* eslint-disable @typescript-eslint/require-await */
import { Controller, Get } from '@nestjs/common';
import { PublicacionesService } from '../publicaciones.service';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  @Get('cantidad')
  async cantidadTotal() {
    return this.publicacionesService.contarPublicaciones();
  }

  @Get('por-usuario')
  async publicacionesPorUsuario() {
    return this.publicacionesService.contarPorUsuario();
  }
}

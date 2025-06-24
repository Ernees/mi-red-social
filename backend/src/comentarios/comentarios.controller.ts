/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { ComentarioDocument } from './entities/comentario.entity';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { AuthGuard } from 'src/guards/logeado-guard/logeado-guard.guard';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  async crearComentario(
    @Body() dto: CreateComentarioDto,
  ): Promise<ComentarioDocument> {
    return this.comentariosService.create(dto);
  }

  @Get('publicacion/:publicacionId')
  async getComentariosPorPublicacion(
    @Param('publicacionId') publicacionId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pag = parseInt(page) || 1;
    const lim = parseInt(limit) || 10;

    return this.comentariosService.obtenerComentariosPorPublicacion(
      publicacionId,
      pag,
      lim,
    );
  }

  @Get()
  findAll() {
    return this.comentariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentariosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentariosService.remove(+id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async actualizarComentario(
    @Param('id') id: string,
    @Body() dto: UpdateComentarioDto,
    @Req() req: Request,
  ) {
    const usuarioId = req['usuario'].id;

    return this.comentariosService.update(id, dto, usuarioId);
  }
}

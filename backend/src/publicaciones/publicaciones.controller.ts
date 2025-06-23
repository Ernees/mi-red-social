/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  HttpStatus,
  MaxFileSizeValidator,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/guards/logeado-guard/logeado-guard.guard';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}
  @UseGuards(AuthGuard)
  @Post('alta')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        filename(req, file, callback) {
          const ext = extname(file.originalname);
          //para guardar las imagenes con nombres q no generen problemas
          const nombreBase = file.originalname
            .replace(ext, '')
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

          const nuevoNombre = `${Date.now()}-${nombreBase}${ext}`;
          callback(null, nuevoNombre);
        },
        destination(req, file, callback) {
          const path = 'public/imgpublicaciones';
          if (!existsSync(path)) {
            mkdirSync(path, { recursive: true });
          }
          callback(null, path);
        },
      }),
    }),
  )
  async create(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        validators: [new MaxFileSizeValidator({ maxSize: 10000000 })],
      }),
    )
    imagen: Express.Multer.File,
    @Body() createPublicacionDto: CreatePublicacioneDto,
    @Req() req,
  ) {
    const usuarioId = req.usuario.sub;

    const dtoConImagen: CreatePublicacioneDto = {
      ...createPublicacionDto,
      urlImagen: imagen.filename,
      usuarioId,
    };

    return await this.publicacionesService.create(dtoConImagen);
  }

  @Get('/traer')
  async findAll(
    @Query('orden') orden: 'fecha' | 'likes' = 'fecha',
    @Query('offset') offset = '0',
    @Query('limit') limit = '10',
    @Req() req,
  ) {
    const usuario = req['usuario'];
    const usuarioId =
      req.query.filtrarPorUsuario === 'true' ? usuario.sub : undefined;

    return this.publicacionesService.findAll({
      orden,
      usuarioId,
      offset: parseInt(offset),
      limit: parseInt(limit),
    });
  }
  @UseGuards(AuthGuard)
  @Get('mis-publicaciones')
  async misPublicaciones(@Req() req) {
    const usuario = req['usuario'];
    return this.publicacionesService.findAll({
      orden: 'fecha',
      usuarioId: usuario.sub,
      offset: 0,
      limit: 3,
    });
  }

  @UseGuards(AuthGuard)
  @Post(':id/like')
  async likePublicacion(@Param('id') publicacionId: string, @Req() req) {
    const usuario = req['usuario'];
    const usuarioId = usuario.sub;

    return this.publicacionesService.darLike(publicacionId, usuarioId);
  }
  @UseGuards(AuthGuard)
  @Post(':id/unlike')
  async quitarLike(@Param('id') publicacionId: string, @Req() req) {
    const usuario = req['usuario'];
    const usuarioId = usuario.sub;

    return this.publicacionesService.quitarLike(publicacionId, usuarioId);
  }

  @Delete(':id')
  remove(@Param('id') idPublicacion: string, @Req() req) {
    const usuario = req['usuario'];
    const idUsuario = usuario.sub;
    const esAdmin = usuario.perfil === 'admin';

    return this.publicacionesService.remove(idPublicacion, idUsuario, esAdmin);
  }
}

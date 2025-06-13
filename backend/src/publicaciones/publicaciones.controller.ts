/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
// import { UpdatePublicacioneDto } from './dto/update-publicacione.dto';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  @UseGuards(AuthGuard)
  @Post('alta')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        filename(req, file, callback) {
          const nuevoNombre = Date.now() + '-' + file.originalname;
          callback(null, nuevoNombre);
        },
        destination(req, file, callback) {
          callback(null, 'public/imgpublicaciones');
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
    const usuario = req['usuario'];
    const usuarioId = usuario.sub;

    const dtoConImagen: CreatePublicacioneDto = {
      ...createPublicacionDto,
      imagen: imagen.filename,
      usuarioId,
    };

    return await this.publicacionesService.create(dtoConImagen);
  }

  @UseGuards(AuthGuard)
  @Get()
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/like')
  async likePublicacion(@Param('id') publicacionId: string, @Req() req) {
    const usuario = req['usuario']; // payload del token que el guard guardo
    const usuarioId = usuario.sub;

    return this.publicacionesService.darLike(publicacionId, usuarioId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/like')
  async quitarLike(@Param('id') publicacionId: string, @Req() req) {
    const usuario = req['usuario'];
    const usuarioId = usuario.sub;

    return this.publicacionesService.quitarLike(publicacionId, usuarioId);
  }

  //Aca voy a usar un guard() jwtAuthGuard y ademas del @Param
  //se recibe por parametro el req con le token para validar que sea o el propietario o admin
  //y desde el token se va a acceder a el id y al rol
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') idPublicacion: string, @Req() req) {
    const usuario = req['usuario'];
    const idUsuario = usuario.sub;
    const esAdmin = usuario.rol === 'admin';

    return this.publicacionesService.remove(idPublicacion, idUsuario, esAdmin);
  }
}

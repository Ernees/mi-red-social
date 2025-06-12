/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
} from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
import { diskStorage } from 'multer';
// import { UpdatePublicacioneDto } from './dto/update-publicacione.dto';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  //Agregar el @req id enlos parametros
  @Post()
  crear(@Body() dto: CreatePublicacioneDto) {
    return this.publicacionesService.create(dto);
  }
  @Post()
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
    //aca iria el @req que me trae los datos del jwt @Req() req: Request,
  ) {
    //aca extraigo los datos  const usuario = req.user as { id: string; rol: string };
    const dtoConImagen: CreatePublicacioneDto = {
      ...createPublicacionDto,
      imagen: imagen.filename,
      //usuarioId: usuario.id, // lo agrego aca no lo traigo desde el frontend
    };
    return await this.publicacionesService.create(dtoConImagen);
  }

  @Get()
  async findAll(
    @Query('orden') orden: 'fecha' | 'likes' = 'fecha',
    @Query('usuarioId') usuarioId?: string,
    @Query('offset') offset = '0',
    @Query('limit') limit = '10',
  ) {
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

  //lo mismo, cuando tenga el token no voy a recibir el id del usuairo sino qu elo voy a extraer del token
  @Post(':id/like')
  async likePublicacion(
    @Param('id') publicacionId: string,
    @Body('usuarioId') usuarioId: string,
  ) {
    return this.publicacionesService.darLike(publicacionId, usuarioId);
  }
  @Delete(':id/like')
  async quitarLike(
    @Param('id') publicacionId: string,
    @Body('usuarioId') usuarioId: string,
  ) {
    return this.publicacionesService.quitarLike(publicacionId, usuarioId);
  }

  //Aca voy a usar un guard() jwtAuthGuard y ademas del @Param
  //se recibe por parametro el req con le token para validar que sea o el propietario o admin
  //y desde el token se va a acceder a el id y al rol
  @Delete(':id')
  remove(
    @Param('id') idPublicacion: string,
    idUsuario: string,
    esAdmin: boolean,
  ) {
    return this.publicacionesService.remove(idPublicacion, idUsuario, esAdmin);
  }
}

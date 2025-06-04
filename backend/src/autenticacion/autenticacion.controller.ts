import {
  Controller,
  Post,
  Body,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly authService: AutenticacionService) {}

  @Post('registro')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        filename(req, file, callback) {
          const nuevoNombre = Date.now() + '-' + file.originalname;
          callback(null, nuevoNombre);
        },
        destination(req, file, callback) {
          callback(null, 'public/fotos');
        },
      }),
    }),
  )
  create(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        validators: [new MaxFileSizeValidator({ maxSize: 10000000 })],
      }),
    )
    foto: Express.Multer.File,
    @Body() createUsuarioDto: CreateUsuarioDto,
  ) {
    const dtoConFoto: CreateUsuarioDto = {
      ...createUsuarioDto,
      foto: foto.filename,
    };

    return this.authService.registrar(dtoConFoto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.authService.login(body.email, body.password);
  }
}

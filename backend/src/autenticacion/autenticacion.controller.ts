/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
  Req,
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
  async create(
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

    const { user, token } = await this.authService.registrar(dtoConFoto);
    return { access_token: token, user };
  }

  @Post('login')
  async login(@Body() body: { mail: string; password: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.authService.login(body.mail, body.password);
  }
  @Post('autorizar')
  autorizar(@Req() req: Request) {
    const header = req.headers['authorization'];
    const token = header?.split(' ')[1];

    const usuario = this.authService.verificarToken(token);
    return { usuario };
  }
}

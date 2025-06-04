/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  async crear(crearUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(crearUsuarioDto.password, salt);

    const usuarioConPasswordHasheado = {
      ...crearUsuarioDto,
      password: hash,
    };

    const usuario = new this.usuarioModel(usuarioConPasswordHasheado);
    return usuario.save();
  }

  //------------------------------------------------------------------------------

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    console.log('USUARIOS SERVICE: Buscando usuario con email:', email); // ¿Qué email está llegando aquí?
    const userFound = await this.usuarioModel.findOne({ email }).lean().exec();
    console.log('USUARIOS SERVICE: Resultado de findOne:', userFound); // ¿Qué devuelve la consulta?
    return userFound;
  }
}

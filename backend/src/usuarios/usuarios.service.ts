/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
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
      perfil: 'usuario',
    };

    const usuario = new this.usuarioModel(usuarioConPasswordHasheado);
    return usuario.save();
  }

  //------------------------------------------------------------------------------
  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find({ activo: true });
  }
  //------------------------------------------------------------------------------

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const userFound = await this.usuarioModel.findOne({ email }).lean().exec();
    return userFound;
  }
  async buscarPorId(id: string): Promise<Usuario | null> {
    return this.usuarioModel.findById(id).lean().exec();
  }
  async bajaLogica(id: string) {
    return this.usuarioModel.findByIdAndUpdate(id, { activo: false });
  }

  async altaLogica(id: string) {
    return this.usuarioModel.findByIdAndUpdate(id, { activo: true });
  }
}

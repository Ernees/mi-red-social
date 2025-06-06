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
      password: hash, //agregar admin/user
    };

    const usuario = new this.usuarioModel(usuarioConPasswordHasheado);
    return usuario.save();
  }

  //------------------------------------------------------------------------------
  async findAll(): Promise<Partial<Usuario>[]> {
    // Puedes usar Partial<Usuario> si solo devuelves algunos campos
    // La proyección es un objeto donde la clave es el campo y el valor 1 significa incluirlo.
    // El _id se incluye por defecto, si no lo quieres, pon _id: 0
    return this.usuarioModel.find({}, { nombre: 1, apellido: 1 }).exec();
    // para sacar el password por seguridad
    // return this.usuarioModel.find({}, { password: 0 }).exec();
  }
  //------------------------------------------------------------------------------

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    console.log('USUARIOS SERVICE: Buscando usuario con email:', email);
    const userFound = await this.usuarioModel.findOne({ email }).lean().exec();
    console.log('USUARIOS SERVICE: Resultado de findOne:', userFound);
    return userFound;
  }
}

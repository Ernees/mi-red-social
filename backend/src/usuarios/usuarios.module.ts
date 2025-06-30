import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';
import { AdminUsersController } from './admins/admins.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  controllers: [UsuariosController, AdminUsersController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}

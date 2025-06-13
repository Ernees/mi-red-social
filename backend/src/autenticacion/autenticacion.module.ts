import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/logeado-guard/logeado-guard.guard';

@Module({
  imports: [
    UsuariosModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'CLAVEULTRASECRETA',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, AuthGuard],
  exports: [AuthGuard],
})
export class AutenticacionModule {}

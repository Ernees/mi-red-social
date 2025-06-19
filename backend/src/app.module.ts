import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { JwtService } from './services/jwt/jwt.service';
// useFactory: es una función que devuelve un objeto de configuración con la URI de conexión a MongoDB.
// configService.get('MONGO_URI'): obtiene el valor de esa variable del archivo .env.
// inject: le indica a Nest que debe inyectar ConfigService en la función useFactory.
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carga .env globalmente asi no tengo que cargarlo en todos los modulos
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    PublicacionesModule,
    AutenticacionModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}

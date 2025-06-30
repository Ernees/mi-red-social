import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicacionSchema } from './entities/publicacione.entity';
import { AuthGuard } from 'src/guards/logeado-guard/logeado-guard.guard';
import { EstadisticasController } from './estadisticas/estadisticas.controller';
import { ComentariosModule } from 'src/comentarios/comentarios.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Publicacion', schema: PublicacionSchema },
    ]),
    ComentariosModule,
  ],
  controllers: [PublicacionesController, EstadisticasController],
  providers: [PublicacionesService, AuthGuard],
})
export class PublicacionesModule {}

import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicacionSchema } from './entities/publicacione.entity';
import { AuthGuard } from 'src/guards/logeado-guard/logeado-guard.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Publicacion', schema: PublicacionSchema },
    ]),
  ],
  controllers: [PublicacionesController],
  providers: [PublicacionesService, AuthGuard],
})
export class PublicacionesModule {}

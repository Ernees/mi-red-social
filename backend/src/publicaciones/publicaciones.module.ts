import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicacionSchema } from './entities/publicacione.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Publicacion', schema: PublicacionSchema },
    ]),
  ],
  controllers: [PublicacionesController],
  providers: [PublicacionesService],
})
export class PublicacionesModule {}

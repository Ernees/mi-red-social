import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
// import { UpdatePublicacioneDto } from './dto/update-publicacione.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Publicacion } from './entities/publicacione.entity';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel('Publicacion')
    private readonly publicacionModel: Model<Publicacion>,
  ) {}

  //AGREGAR USERID Y EN EL MODEL TMB, AUTOR:USERID
  async create(createPublicacionDto: CreatePublicacioneDto) {
    const nueva = new this.publicacionModel({
      ...createPublicacionDto,
      //urlImagen: `public/imgpublicaciones/${createPublicacionDto.imagen}`,
      activa: true,
      likes: [],
      comentarios: [],
      fecha: new Date(),
    });

    return await nueva.save();
  }

  //devuelve la lista de publis dependiento del orden
  async findAll({
    orden,
    usuarioId,
    offset,
    limit,
  }: {
    orden: 'fecha' | 'likes';
    usuarioId?: string;
    offset: number;
    limit: number;
  }) {
    //filtro solo las publicaciones activas
    //objeto que tiene como claves strings y dentro any cosas
    const filtro: Record<string, any> = { activa: true };

    //Si hay usuarioId lo agrego el filtro
    if (usuarioId) {
      filtro.usuarioId = usuarioId;
    }

    //pipeline para aggregate()
    //PipeLineStage[] representa cada etapa posible del aggregate()
    const pipeline: PipelineStage[] = [{ $match: filtro }];

    if (orden === 'likes') {
      pipeline.push({
        $addFields: {
          cantidadLikes: { $size: '$likes' }, // cantidad de likes del array
        },
      });

      pipeline.push({
        $sort: { cantidadLikes: -1 }, //ordenar de mayor cantidad a menor
      });
    } else {
      pipeline.push({
        $sort: { fecha: -1 }, // orden por fecha +reciente a +vieja
      });
    }

    pipeline.push({ $skip: offset });
    pipeline.push({ $limit: limit });
    //me aseguro que mi modelo siempre devuelve la forma esperada tipando
    return this.publicacionModel.aggregate<Publicacion>(pipeline).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} publicacione`;
  }

  //validar q sea solo el user q la hizo o un admin
  async remove(publicacionId: string, usuarioId: string, esAdmin: boolean) {
    const publicacion = await this.publicacionModel.findById(publicacionId);

    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }

    const esPropietario = publicacion.usuarioId === usuarioId;

    if (!esPropietario && !esAdmin) {
      throw new ForbiddenException(
        'No tenes permiso para eliminar esta publicación',
      );
    }

    publicacion.activa = false;
    return await publicacion.save(); // baja logica
  }

  async darLike(publicacionId: string, usuarioId: string): Promise<string> {
    const publicacion = await this.publicacionModel.findById(publicacionId);

    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }

    //verifico si el usuario ya le dio like
    if (publicacion.likes.includes(usuarioId)) {
      return 'Ya diste like a esta publicación';
    }

    //si no le había dado like lo agregamos
    publicacion.likes.push(usuarioId);
    //convierto a array lo que converti a un set del array original jasjsaj
    //para asegurarnos que no haya duplicados
    publicacion.likes = Array.from(new Set(publicacion.likes));

    await publicacion.save();
    return 'Like agregado';
  }

  async quitarLike(publicacionId: string, usuarioId: string): Promise<string> {
    const publicacion = await this.publicacionModel.findById(publicacionId);

    if (!publicacion) throw new NotFoundException('Publicación no encontrada');

    if (!publicacion.likes.includes(usuarioId)) {
      //nunca confiar en el front
      throw new BadRequestException('No habías dado like');
    }

    publicacion.likes = publicacion.likes.filter((id) => id !== usuarioId);
    await publicacion.save();
    return 'Like sacado';
  }
}

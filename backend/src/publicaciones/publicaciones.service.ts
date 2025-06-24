import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
// import { UpdatePublicacioneDto } from './dto/update-publicacione.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { PublicacionDocument } from './entities/publicacione.entity';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel('Publicacion')
    private readonly publicacionModel: Model<PublicacionDocument>,
  ) {}

  //AGREGAR USERID Y EN EL MODEL TMB, AUTOR:USERID
  async create(createPublicacionDto: CreatePublicacioneDto) {
    const nueva = new this.publicacionModel({
      ...createPublicacionDto,
      activa: true,
      comentarios: [],
    });

    return await nueva.save();
  }

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
    const filtro: Record<string, any> = { activa: true };
    if (usuarioId) filtro.usuarioId = usuarioId;

    const pipeline: PipelineStage[] = [{ $match: filtro }];

    if (orden === 'likes') {
      pipeline.push({
        $addFields: {
          cantidadLikes: { $size: '$likes' },
        },
      });
      pipeline.push({ $sort: { cantidadLikes: -1, _id: 1 } });
    } else {
      pipeline.push({ $sort: { fecha: -1, _id: 1 } });
    }

    pipeline.push({ $skip: offset });
    pipeline.push({ $limit: limit });

    const publicaciones = await this.publicacionModel
      .aggregate<PublicacionDocument>(pipeline)
      .exec();
    const total = await this.publicacionModel.countDocuments(filtro);

    return {
      publicaciones,
      total,
    };
  }
  async findOne(publicacionId: string) {
    const publicacion = await this.publicacionModel.findById(publicacionId);

    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }

    return {
      _id: publicacion._id,
      titulo: publicacion.titulo,
      descripcion: publicacion.descripcion,
      urlImagen: publicacion.urlImagen,
    };
  }

  //validar q sea solo el user q la hizo o un admin
  async remove(publicacionId: string, usuarioId: string, esAdmin: boolean) {
    const publicacion = await this.publicacionModel.findById(publicacionId);

    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }

    const esPropietario = new Types.ObjectId(publicacion.usuarioId).equals(
      usuarioId,
    );

    if (!esPropietario && !esAdmin) {
      throw new ForbiddenException(
        'No tenes permiso para eliminar esta publicación',
      );
    }

    publicacion.activa = false;
    return await publicacion.save(); // baja logica
  }

  async darLike(
    publicacionId: string,
    usuarioId: string,
  ): Promise<{ likesCount: number }> {
    const publicacion = await this.publicacionModel.findById(publicacionId);

    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }

    //verifico si el usuario ya le dio like
    if (publicacion.likes.some((id) => id.equals(usuarioId))) {
      return { likesCount: publicacion.likes.length };
    }

    // Si no le había dado like, lo agregamos
    publicacion.likes.push(new Types.ObjectId(usuarioId));
    await publicacion.save();

    return { likesCount: publicacion.likes.length };
  }

  async quitarLike(
    publicacionId: string,
    usuarioId: string,
  ): Promise<{ likesCount: number }> {
    const publicacion = await this.publicacionModel.findById(publicacionId);

    if (!publicacion) throw new NotFoundException('Publicación no encontrada');

    if (!publicacion.likes.some((id) => id.equals(usuarioId))) {
      throw new BadRequestException('No habias dado like');
    }

    publicacion.likes = publicacion.likes.filter((id) => !id.equals(usuarioId));
    await publicacion.save();

    return { likesCount: publicacion.likes.length };
  }
}

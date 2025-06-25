/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comentario, ComentarioDocument } from './entities/comentario.entity';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectModel('comentarios')
    private comentarioModel: Model<Comentario>,
  ) {}

  async create(
    createComentarioDto: CreateComentarioDto,
  ): Promise<ComentarioDocument> {
    const comentario = new this.comentarioModel({
      ...createComentarioDto,
      usuarioId: new Types.ObjectId(createComentarioDto.usuarioId),
      publicacionId: new Types.ObjectId(createComentarioDto.publicacionId),
    });
    return comentario.save();
  }
  findAll() {
    return `This action returns all comentarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comentario`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
  async obtenerComentariosPorPublicacion(
    publicacionId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    return this.comentarioModel
      .find({ publicacionId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('usuarioId', 'nombre')
      .exec();
  }
  async update(id: string, dto: UpdateComentarioDto, userId: string) {
    const comentario = await this.comentarioModel.findById(id);

    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }

    if (comentario.usuarioId.toString() !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para editar este comentario',
      );
    }

    return this.comentarioModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        modificado: true,
      },
      { new: true },
    );
  }
}

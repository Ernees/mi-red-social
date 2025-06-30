// src/users/admin-users.controller.ts

import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/es-admin/es-admin.guard';
import { AuthGuard } from 'src/guards/logeado-guard/logeado-guard.guard';
import { UsuariosService } from '../usuarios.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

@Controller('admin/users')
@UseGuards(AuthGuard, AdminGuard)
export class AdminUsersController {
  constructor(private readonly usersService: UsuariosService) {}

  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  findAll(): Promise<Usuario[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUsuarioDto) {
    return this.usersService.crear(createUserDto);
  }

  @Delete(':id')
  disable(@Param('id') id: string) {
    return this.usersService.bajaLogica(id);
  }

  @Post(':id/alta')
  enable(@Param('id') id: string) {
    return this.usersService.altaLogica(id);
  }
}

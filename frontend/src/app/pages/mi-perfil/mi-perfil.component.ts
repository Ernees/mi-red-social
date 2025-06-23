import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PublicacionesService } from '../../services/publicaciones.service';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioModel } from '../../models/usuario.model';
import { PublicacionItemComponent } from '../publicaciones/publicacion-item/publicacion-item.component';

@Component({
  selector: 'app-mi-perfil',
  imports: [CommonModule, PublicacionItemComponent],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css',
})
export class MiPerfilComponent {
  publicaciones: any[] = [];
  usuarioId: string = '';
  usuario!: UsuarioModel;
  constructor(
    private authService: AuthService,
    private publicacionesService: PublicacionesService,
    private router: Router,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();

    if (token && !this.authService.isTokenExpirado(token)) {
      const datosToken = this.authService.getDatosToken(token);
      this.usuarioId = datosToken?.sub || '';
      this.cargarPublicaciones();
    } else {
      this.usuarioId = '';
      this.router.navigateByUrl('/login');
    }
    this.usuarioService.obtenerPerfil().subscribe((data) => {
      this.usuario = data;
    });
  }

  cargarPublicaciones() {
    const token = this.authService.getToken() || '';
    this.publicacionesService
      .obtenerUltimasPublicaciones(this.usuarioId, token)
      .subscribe({
        next: (res) => {
          this.publicaciones = res.publicaciones;
        },
        error: () => {
          this.publicaciones = [];
        },
      });
  }

  crearPublicacion() {
    this.router.navigateByUrl('/publicaciones/crear');
  }
}

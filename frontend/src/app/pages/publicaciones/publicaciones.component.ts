import { Component, Input } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones.service';
import { PublicacionModel } from '../../models/publicacion.model';
import { Router } from '@angular/router';
import { PublicacionItemComponent } from './publicacion-item/publicacion-item.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-publicaciones',
  imports: [PublicacionItemComponent],
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.css',
})
export class PublicacionesComponent {
  orden: 'fecha' | 'likes' = 'fecha';
  pagina: number = 1;
  limite: number = 3;
  total: number = 0;
  usuario: any;
  cargando = true;
  publicaciones: PublicacionModel[] = [];

  constructor(
    private pubService: PublicacionesService,
    private router: Router,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.usuario = this.apiService.obtenerUsuario();
    console.log(this.usuario?.rol);
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    const offset = (this.pagina - 1) * this.limite;
    this.pubService
      .obtenerPublicaciones(this.orden, offset, this.limite)
      .subscribe((data) => {
        this.publicaciones = data.publicaciones;
        this.total = data.total;
      });
    this.cargando = false;
  }
  crearPublicacion() {
    this.router.navigate(['/publicaciones/crear']);
  }

  paginaSiguiente() {
    if (this.pagina < this.totalPaginas) {
      this.pagina++;
      this.cargarPublicaciones();
    }
  }

  paginaAnterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.cargarPublicaciones();
    }
  }
  get totalPaginas(): number {
    return Math.ceil(this.total / this.limite);
  }

  actualizarLikes(publicacionId: string) {
    const usuarioId = this.apiService.obtenerUsuarioId();
    if (!usuarioId) return;

    const pub = this.publicaciones.find((p) => p._id === publicacionId);
    if (!pub) return;

    const index = pub.likes.indexOf(usuarioId);
    if (index === -1) {
      pub.likes.push(usuarioId);
    } else {
      pub.likes.splice(index, 1);
    }
  }
  darDeBaja(id: string) {
    this.pubService.deshabilitarPublicacion(id).subscribe(() => {
      alert('Publicación deshabilitada');
      this.cargarPublicaciones();
    });
  }
  ir() {
    this.router.navigate(['dashboard']);
  }
}

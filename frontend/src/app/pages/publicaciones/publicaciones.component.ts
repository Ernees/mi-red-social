import { Component } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones.service';
import { PublicacionModel } from '../../models/publicacion.model';
import { Router } from '@angular/router';
import { PublicacionItemComponent } from './publicacion-item/publicacion-item.component';

@Component({
  selector: 'app-publicaciones',
  imports: [PublicacionItemComponent],
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.css',
})
export class PublicacionesComponent {
  orden: 'fecha' | 'likes' = 'fecha';
  pagina: number = 1;
  limite: number = 5;
  total: number = 0;
  publicaciones: PublicacionModel[] = [];

  constructor(
    private pubService: PublicacionesService,
    private router: Router
  ) {}
  ngOnInit() {
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
  }
  irCrearPublicacion() {
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
}

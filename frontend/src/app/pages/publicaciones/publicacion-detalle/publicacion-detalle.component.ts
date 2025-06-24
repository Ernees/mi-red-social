import { Component, Input } from '@angular/core';
import { PublicacionModel } from '../../../models/publicacion.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PublicacionesService } from '../../../services/publicaciones.service';
import { ComentariosComponent } from '../comentarios/comentarios.component';

@Component({
  selector: 'app-publicacion-detalle',
  imports: [ComentariosComponent],
  templateUrl: './publicacion-detalle.component.html',
  styleUrl: './publicacion-detalle.component.css',
})
export class PublicacionDetalleComponent {
  publicacion!: PublicacionModel;

  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PublicacionesService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id.length === 24) {
      this.publicacionesService.getPublicacionPorId(id).subscribe({
        next: (data) => {
          this.publicacion = data;
          console.log('Publicación recibida:', this.publicacion);
        },
        error: (err) => console.error('Error al obtener publicación:', err),
      });
    } else {
      console.error('ID de publicación inválido:', id);
    }
  }
  volverAtras() {
    this.location.back();
  }
}

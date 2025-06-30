import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PublicacionModel } from '../../../models/publicacion.model';
import { PublicacionesService } from '../../../services/publicaciones.service';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicacion-item',
  imports: [],
  templateUrl: './publicacion-item.component.html',
  styleUrl: './publicacion-item.component.css',
})
export class PublicacionItemComponent {
  @Input() publicacion!: any;
  @Input() mostrarBotonesLike: boolean = false;
  @Input() mostrarBotonBaja: boolean = false;

  @Output() likeCambiado = new EventEmitter<string>();
  @Output() darDeBaja = new EventEmitter<string>();

  constructor(
    private publicacionesService: PublicacionesService,
    private router: Router
  ) {}
  verEnGrande() {
    this.router.navigate(['/publicacion-item', this.publicacion._id]);
  }

  dioLike(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const usuarioId = JSON.parse(atob(token.split('.')[1])).sub;
    return this.publicacion.likes.includes(usuarioId);
  }
  eliminar() {
    this.darDeBaja.emit(this.publicacion._id);
  }
  toggleLike() {
    const accion = this.dioLike()
      ? this.publicacionesService.quitarLike(this.publicacion._id)
      : this.publicacionesService.darLike(this.publicacion._id);

    accion.subscribe(() => this.likeCambiado.emit(this.publicacion._id));
  }
}

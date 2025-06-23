import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PublicacionModel } from '../../../models/publicacion.model';
import { PublicacionesService } from '../../../services/publicaciones.service';

@Component({
  selector: 'app-publicacion-item',
  imports: [],
  templateUrl: './publicacion-item.component.html',
  styleUrl: './publicacion-item.component.css',
})
export class PublicacionItemComponent {
  @Input() publicacion!: PublicacionModel;
  @Input() mostrarBotonesLike: boolean = true;
  @Output() likeCambiado = new EventEmitter<string>();

  constructor(private publicacionesService: PublicacionesService) {}

  dioLike(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const usuarioId = JSON.parse(atob(token.split('.')[1])).sub;
    return this.publicacion.likes.includes(usuarioId);
  }

  toggleLike() {
    const accion = this.dioLike()
      ? this.publicacionesService.quitarLike(this.publicacion._id)
      : this.publicacionesService.darLike(this.publicacion._id);

    accion.subscribe(() => this.likeCambiado.emit(this.publicacion._id));
  }
}

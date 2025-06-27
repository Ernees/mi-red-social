import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ComentariosService } from '../../../services/comentarios.service';
import { ComentarioModel } from '../../../models/comentario.model';
import { AuthService } from '../../../services/auth.service';
import { UsuarioModel } from '../../../models/usuario.model';

@Component({
  selector: 'app-comentarios',
  imports: [ReactiveFormsModule],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css',
})
export class ComentariosComponent {
  @Input() publicacionId!: string;

  comentarios: ComentarioModel[] = [];
  pagina = 1;
  limite = 5;
  hayMas = true;
  comentarioForm: FormGroup;
  comentarioEditForm: FormGroup;
  editandoComentarioId: string | null = null;
  usuarioId: string | null = null;

  constructor(
    private comentariosService: ComentariosService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.comentarioForm = this.fb.group({
      contenido: ['', [Validators.required, Validators.maxLength(144)]],
    });
    this.comentarioEditForm = this.fb.group({
      contenidoEditado: ['', [Validators.required, Validators.maxLength(144)]],
    });
  }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      const datos = this.authService.getDatosToken(token);
      this.usuarioId = datos?.sub ?? null;
    }

    this.cargarComentarios();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['publicacionId']) {
      this.pagina = 1;
      this.comentarios = [];
      this.hayMas = true;
      if (this.publicacionId) {
        this.cargarComentarios();
      }
    }
  }

  cargarComentarios() {
    if (!this.hayMas) return;

    this.comentariosService
      .getComentariosPorPublicacion(
        this.publicacionId,
        this.pagina,
        this.limite
      )
      .subscribe((nuevosComentarios) => {
        const idsExistentes = new Set(this.comentarios.map((c) => c._id));
        const comentariosFiltrados = nuevosComentarios.filter(
          (c) => !idsExistentes.has(c._id)
        );
        this.comentarios = [...this.comentarios, ...comentariosFiltrados];

        if (nuevosComentarios.length < this.limite) {
          this.hayMas = false;
        } else {
          this.pagina++;
        }
      });
  }
  cargarMas() {
    this.cargarComentarios();
  }

  agregarComentario() {
    if (this.comentarioForm.invalid || !this.usuarioId) return;

    const nuevoComentario = {
      contenido: this.comentarioForm.value.contenido,
      usuarioId: this.usuarioId!,
      publicacionId: this.publicacionId,
    } as unknown as ComentarioModel;

    this.comentariosService.agregarComentario(nuevoComentario).subscribe(() => {
      this.pagina = 1;
      this.comentarios = [];
      this.hayMas = true;
      this.cargarComentarios();
      this.comentarioForm.reset();
    });
  }
  iniciarEdicion(comentario: ComentarioModel) {
    this.editandoComentarioId = comentario._id;
    this.comentarioEditForm
      .get('contenidoEditado')
      ?.setValue(comentario.contenido);
  }

  cancelarEdicion() {
    this.editandoComentarioId = null;
    this.comentarioEditForm.reset();
  }

  guardarEdicion(comentario: ComentarioModel) {
    if (this.comentarioEditForm.invalid) return;

    const nuevoContenido = this.comentarioEditForm.value.contenidoEditado;

    this.comentariosService
      .editarComentario(comentario._id, nuevoContenido)
      .subscribe({
        next: (comentarioActualizado) => {
          const index = this.comentarios.findIndex(
            (c) => c._id === comentarioActualizado._id
          );
          if (index > -1) {
            this.comentarios[index] = comentarioActualizado;
          }
          this.cancelarEdicion();
        },
        error: (err) => {
          console.error('Error al actualizar el comentario:', err);
        },
      });
  }

  esMiComentario(comentario: ComentarioModel): boolean {
    if (
      typeof comentario.usuarioId === 'object' &&
      comentario.usuarioId !== null &&
      '_id' in comentario.usuarioId
    ) {
      return comentario.usuarioId._id === this.usuarioId;
    }
    return comentario.usuarioId === this.usuarioId;
  }

  getUsuarioNombre(comentario: ComentarioModel): string {
    if (
      typeof comentario.usuarioId === 'object' &&
      comentario.usuarioId !== null &&
      'nombre' in comentario.usuarioId
    ) {
      return (comentario.usuarioId as UsuarioModel).nombre;
    }
    return 'Usuario Desconocido';
  }
}

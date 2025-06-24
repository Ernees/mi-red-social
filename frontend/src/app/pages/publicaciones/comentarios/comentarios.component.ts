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

  usuarioId: string | null = null;

  constructor(
    private comentariosService: ComentariosService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.comentarioForm = this.fb.group({
      contenido: ['', [Validators.required, Validators.maxLength(144)]],
    });
  }

  comentarioForm: FormGroup;

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      const datos = this.authService.getDatosToken(token);
      this.usuarioId = datos?.sub ?? null;
    }

    this.cargarComentarios();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['publicacionId']) {
      console.log('publicacionId actualizado:', this.publicacionId);
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
    this.pagina++;
    this.cargarComentarios();
  }

  agregarComentario() {
    console.log(this.publicacionId);
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
}

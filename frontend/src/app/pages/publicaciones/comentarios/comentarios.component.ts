import { Component, Input } from '@angular/core';
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

  usuarioId: string | null = null; // <-- nueva propiedad

  constructor(
    private comentariosService: ComentariosService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.comentarioForm = this.fb.group({
      contenido: ['', Validators.required],
    });
  }

  comentarioForm: FormGroup;

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      const datos = this.authService.getDatosToken(token);
      this.usuarioId = datos?.sub ?? null;
      console.log('usuarioId desde token:', typeof this.usuarioId);
    }

    this.cargarComentarios();
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
        this.comentarios = [...this.comentarios, ...nuevosComentarios];

        if (nuevosComentarios.length < this.limite) {
          this.hayMas = false;
        } else {
          this.pagina++;
        }
      });
  }

  agregarComentario() {
    if (this.comentarioForm.invalid || !this.usuarioId) return;

    const nuevoComentario = {
      contenido: this.comentarioForm.value.contenido,
      usuarioId: this.usuarioId,
      publicacionId: this.publicacionId,
    };

    this.comentariosService.agregarComentario(nuevoComentario).subscribe(() => {
      this.pagina = 1;
      this.comentarios = [];
      this.hayMas = true;
      this.cargarComentarios();
      this.comentarioForm.reset();
    });
  }
}

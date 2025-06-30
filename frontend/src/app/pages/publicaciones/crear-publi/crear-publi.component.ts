import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PublicacionesService } from '../../../services/publicaciones.service';
@Component({
  selector: 'app-crear-publi',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-publi.component.html',
  styleUrl: './crear-publi.component.css',
})
export class CrearPubliComponent {
  formulario: FormGroup;
  pubService = inject(PublicacionesService);
  imagen?: File;
  constructor() {
    this.formulario = new FormGroup({
      titulo: new FormControl<string>('', {
        validators: [
          Validators.minLength(3),
          Validators.maxLength(28),
          Validators.required,
        ],
      }),
      descripcion: new FormControl<string>('', {
        validators: [
          Validators.minLength(3),
          Validators.maxLength(28),
          Validators.required,
        ],
      }),
      foto: new FormControl<File | null>(null, {
        validators: [Validators.required],
      }),
    });
  }

  cargaDeImagen(event: any) {
    if (event.target && event.target.files.length > 0) {
      const archivo = event.target.files[0];
      this.imagen = archivo;
    }
  }

  altaPublicacion() {
    if (this.imagen) {
      if (this.formulario.invalid) {
        return;
      }

      if (this.formulario.invalid) return;
      const datos = this.formulario.value;
      const formData = new FormData();

      formData.append('titulo', datos.titulo);
      formData.append('descripcion', datos.descripcion);
      formData.append('imagen', this.imagen, this.imagen.name);

      this.pubService.crearPubli(formData);
    }
  }
}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicacionesService } from '../../services/publicaciones.service';

@Component({
  selector: 'app-publicaciones',
  imports: [],
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.css',
})
export class PublicacionesComponent {
  formulario: FormGroup;
  pubService = inject(PublicacionesService);
  imagen?: File;
  constructor() {
    this.formulario = new FormGroup({
      titulo: new FormControl<string>('', {
        validators: [
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.required,
        ],
      }),
      descripcion: new FormControl<string>('', {
        validators: [
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.required,
        ],
      }),
      foto: new FormControl<File | null>(null, {
        validators: [Validators.required],
      }),
    });
  }
  cargaDeImagen(event: any) {
    if (event.target && event.target.files) {
      console.log(event.target.files[0]);
      this.imagen = event.target.files[0];
    }
  }
  altaPublicacion() {
    if (this.imagen) {
      // Extraer los datos de los formularios y pasarlos al form data
      if (this.formulario.invalid) return;
      const datos = this.formulario.value;
      const formData = new FormData();
      console.log(datos.email);

      formData.append('nombre', datos.nombre);
      formData.append('apellido', datos.apellido);
      formData.append('email', datos.mail);
      formData.append('nombreUsuario', datos.nombreUsuario);
      formData.append('fNac', datos.fNac);
      formData.append('password', datos.password);
      formData.append('descripcion', datos.descripcion);
      formData.append('foto', this.imagen, this.imagen.name);
      console.log(formData);

      this.pubService.crearPubli(formData);
    }
  }
}

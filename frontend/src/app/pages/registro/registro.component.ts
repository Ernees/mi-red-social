import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  formulario: FormGroup;
  apiService = inject(ApiService);
  archivo?: File;
  constructor() {
    this.formulario = new FormGroup({
      // nombre: new FormControl<string>('', {
      //   validators: [
      //     Validators.minLength(3),
      //     Validators.maxLength(15),
      //     Validators.required,
      //   ],
      // }),
      // apellido: new FormControl<string>('', {
      //   validators: [
      //     Validators.minLength(3),
      //     Validators.maxLength(15),
      //     Validators.required,
      //   ],
      // }),
      // edad: new FormControl<number>(0, {
      //   validators: [
      //     Validators.min(18),
      //     Validators.max(80),
      //     Validators.required,
      //   ],
      // }),
      // mail: new FormControl<string>('', {
      //   validators: [
      //     Validators.minLength(3),
      //     Validators.maxLength(25),
      //     Validators.required,
      //     Validators.email,
      //   ],
      // }),
      // password: new FormControl<string>('', {
      //   validators: [
      //     Validators.minLength(3),
      //     Validators.maxLength(15),
      //     Validators.required,
      //   ],
      // }),
      foto: new FormControl<File | null>(null, {
        validators: [Validators.required],
      }),
    });
  }

  cargaDeImagen(event: any) {
    if (event.target && event.target.files) {
      console.log(event.target.files[0]);
      this.archivo = event.target.files[0];
    }
  }
  registrarse() {
    if (this.archivo) {
      // Extraer los datos de los formularios y pasarlos al form data
      const formData = new FormData();

      formData.append('nombre', 'palbo'); // aca van los datos del registro
      formData.append('password', '123456');
      formData.append('email', 'caquita@asda.com');
      formData.append('foto', this.archivo, this.archivo.name);

      this.apiService.crear(formData);
    }
  }
  async guardarDatos() {
    if (this.formulario.invalid) return;

    const nombre = this.formulario.value.nombre;
    const apellido = this.formulario.value.apellido;
    const edad = this.formulario.value.edad;
    const email = this.formulario.value.mail;
    const password = this.formulario.value.password;
  }

  get nombre() {
    return this.formulario.get('nombre');
  }
  get apellido() {
    return this.formulario.get('apellido');
  }
  get edad() {
    return this.formulario.get('edad');
  }
  get mail() {
    return this.formulario.get('mail');
  }
  get password() {
    return this.formulario.get('password');
  }
  get foto() {
    return this.formulario.get('foto');
  }
}

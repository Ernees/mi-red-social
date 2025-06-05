import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { passwordMatchValidator } from '../../validators/match-password.validator';

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
    this.formulario = new FormGroup(
      {
        nombre: new FormControl<string>('', {
          validators: [
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.required,
          ],
        }),
        apellido: new FormControl<string>('', {
          validators: [
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.required,
          ],
        }),
        mail: new FormControl<string>('', {
          validators: [
            Validators.minLength(3),
            Validators.maxLength(25),
            Validators.required,
            Validators.email,
          ],
        }),
        nombreUsuario: new FormControl<string>('', {
          validators: [
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.required,
          ],
        }),
        fNac: new FormControl<number>(0, {
          validators: [Validators.required],
        }),
        descripcion: new FormControl<number>(0, {
          validators: [Validators.max(80), Validators.required],
        }),
        password: new FormControl<string>('', {
          validators: [
            Validators.minLength(8),
            Validators.maxLength(15),
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/), //Expresion regular que verifica que tenga al menos un numero y una mayus
            Validators.required,
          ],
        }),
        passwordRepetida: new FormControl<string>('', {
          validators: [
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/), //Expresion regular que verifica que tenga al menos un numero y una mayus
            Validators.required,
          ],
        }),
        foto: new FormControl<File | null>(null, {
          validators: [Validators.required],
        }),
      },
      { validators: passwordMatchValidator() }
    );
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
      formData.append('foto', this.archivo, this.archivo.name);
      console.log(formData);

      this.apiService.crear(formData);
    }
  }

  get nombre() {
    return this.formulario.get('nombre');
  }
  get apellido() {
    return this.formulario.get('apellido');
  }
  get mail() {
    return this.formulario.get('mail');
  }
  get nombreUsuario() {
    return this.formulario.get('nombreUsuario');
  }
  get password() {
    return this.formulario.get('password');
  }
  get passwordRepetida() {
    return this.formulario.get('passwordRepetida');
  }
  get fNac() {
    return this.formulario.get('fNac');
  }
  get descripcion() {
    return this.formulario.get('descripcion');
  }
  get foto() {
    return this.formulario.get('foto');
  }
}

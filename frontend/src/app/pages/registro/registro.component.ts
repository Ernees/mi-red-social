import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  formulario: FormGroup;
  constructor() {
    this.formulario = new FormGroup({
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
      edad: new FormControl<number>(0, {
        validators: [
          Validators.min(18),
          Validators.max(80),
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
      password: new FormControl<string>('', {
        validators: [
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.required,
        ],
      }),
    });
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
}

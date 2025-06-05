import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formulario: FormGroup;
  apiService = inject(ApiService);
  mensajeError = signal('');
  constructor() {
    this.formulario = new FormGroup({
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

  async iniciarSesion() {
    if (!this.formulario.valid) return;
    const datos = this.formulario.value;
    console.log(datos.mail);
    console.log(datos.password);
    this.apiService.iniciarSesion({
      mail: datos.mail,
      password: datos.password,
    });
  }

  get mail() {
    return this.formulario.get('mail');
  }
  get password() {
    return this.formulario.get('password');
  }
}

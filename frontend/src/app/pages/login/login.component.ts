import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formulario: FormGroup;
  mensajeError = signal('');
  cargando = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
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

    const mail = this.formulario.value.mail;
    const password = this.formulario.value.password;
    const credenciales = { mail, password };

    this.cargando = true;
    this.mensajeError.set('');

    this.authService.iniciarSesion(credenciales).subscribe({
      next: (respuesta) => {
        localStorage.setItem('token', respuesta.access_token);
        this.formulario.reset();
        this.authService.router.navigateByUrl('/publicaciones');
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al logearse:', error);
        this.mensajeError.set('Correo o contraseña incorrectos.');
        this.cargando = false;
      },
    });
  }

  get mail() {
    return this.formulario.get('mail');
  }
  get password() {
    return this.formulario.get('password');
  }
}

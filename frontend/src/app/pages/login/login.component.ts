import { Component, signal } from '@angular/core';
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
  cuentaDeshabilitada = false;

  constructor(private authService: AuthService) {
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

    const credenciales = this.formulario.value;

    this.cargando = true;
    this.mensajeError.set('');
    this.cuentaDeshabilitada = false;

    this.authService.iniciarSesion(credenciales).subscribe({
      next: () => {
        this.formulario.reset();
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al logearse:', error);

        const mensaje = error?.error?.message;

        if (mensaje === 'Tu cuenta esta deshabilitada') {
          this.cuentaDeshabilitada = true;
        } else {
          this.mensajeError.set('Correo o contraseña incorrectos.');
        }

        this.cargando = false;
      },
    });
  }
  cerrarModal() {
    this.cuentaDeshabilitada = false;
  }
  get mail() {
    return this.formulario.get('mail');
  }
  get password() {
    return this.formulario.get('password');
  }
}

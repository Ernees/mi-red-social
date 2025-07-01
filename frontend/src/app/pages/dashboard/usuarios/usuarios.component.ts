import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { passwordMatchValidator } from '../../../validators/match-password.validator';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {
  formulario: FormGroup;
  usuarios: UsuarioModel[] = [];
  apiService = inject(ApiService);
  cargando = false;
  mensajeError = signal('');
  archivo?: File;
  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService
  ) {
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
        descripcion: new FormControl<string>('', {
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
        rol: new FormControl<string>('', {
          validators: [Validators.required],
        }),
      },
      { validators: passwordMatchValidator() }
    );
    this.cargarUsuarios();
  }

  cargaDeImagen(event: any) {
    if (event.target && event.target.files) {
      console.log(event.target.files[0]);
      this.archivo = event.target.files[0];
    }
  }

  registrar() {
    if (this.archivo && !this.formulario.invalid) {
      const datos = this.formulario.value;
      const formData = new FormData();

      formData.append('nombre', datos.nombre);
      formData.append('apellido', datos.apellido);
      formData.append('email', datos.mail);
      formData.append('nombreUsuario', datos.nombreUsuario);
      formData.append('fNac', datos.fNac.toString());
      formData.append('password', datos.password);
      formData.append('descripcion', datos.descripcion);
      formData.append('foto', this.archivo, this.archivo.name);
      formData.append('rol', datos.rol);

      this.cargando = true;
      this.mensajeError.set('');

      this.authService.registrar(formData).subscribe({
        next: () => {
          this.formulario.reset();
          this.archivo = undefined;
          this.cargarUsuarios();
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al registrarse:', error);
          this.mensajeError.set('Error al registrarse');
          this.cargando = false;
        },
      });
    }
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }
  darDeBaja(id: string) {
    this.usuariosService.darDeBaja(id).subscribe(() => this.cargarUsuarios());
  }

  darDeAlta(id: string) {
    this.usuariosService.darDeAlta(id).subscribe(() => this.cargarUsuarios());
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

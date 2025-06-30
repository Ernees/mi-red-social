import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService
  ) {
    this.registroForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  registrarUsuario(): void {
    if (this.registroForm.invalid) return;

    this.usuariosService.registrarUsuario(this.registroForm.value).subscribe({
      next: (res) => {
        console.log('Usuario registrado:', res);
        this.registroForm.reset();
      },
      error: (err) => {
        console.error('Error registrando usuario:', err);
      },
    });
  }
}

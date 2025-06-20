import { Component } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mi-perfil',
  imports: [CommonModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css',
})
export class MiPerfilComponent {
  usuario!: UsuarioModel;

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit() {
    this.usuarioService.obtenerPerfil().subscribe((data) => {
      this.usuario = data;
    });
  }
}

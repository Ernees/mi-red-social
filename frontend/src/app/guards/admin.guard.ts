import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private api: ApiService, private router: Router) {}

  canActivate(): boolean {
    const usuario = this.api.obtenerUsuario();
    if (usuario && usuario.rol === 'admin') {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}

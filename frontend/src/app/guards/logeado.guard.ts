import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const logeadoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const token = authService.getToken();

  //si hay un token y no esta vencido se redirige a /bienvenida
  if (token && !authService.isTokenExpirado(token)) {
    authService.router.navigateByUrl('/publicaciones');
    return false;
  }

  console.log('te dejo apsar');
  return true;
};

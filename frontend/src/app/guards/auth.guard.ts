import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const token = authService.getToken();

  if (!token || authService.isTokenExpirado(token)) {
    authService.router.navigateByUrl('/bienvenida');
    return false;
  }

  return true;
};

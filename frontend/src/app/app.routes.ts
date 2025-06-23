import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { logeadoGuard } from './guards/logeado.guard';

export const routes: Routes = [
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then(
        (modulo) => modulo.RegistroComponent
      ),
    canActivate: [logeadoGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(
        (modulo) => modulo.LoginComponent
      ),
    canActivate: [logeadoGuard],
  },
  {
    path: 'publicaciones',
    loadComponent: () =>
      import('./pages/publicaciones/publicaciones.component').then(
        (modulo) => modulo.PublicacionesComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'publicaciones/crear',
    loadComponent: () =>
      import('./pages/publicaciones/crear-publi/crear-publi.component').then(
        (modulo) => modulo.CrearPubliComponent
      ),
  },
  {
    path: 'mi-perfil',
    loadComponent: () =>
      import('./pages/mi-perfil/mi-perfil.component').then(
        (modulo) => modulo.MiPerfilComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/bienvenida/bienvenida.component').then(
        (modulo) => modulo.BienvenidaComponent
      ),
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/bienvenida/bienvenida.component').then(
        (modulo) => modulo.BienvenidaComponent
      ),
  },
];

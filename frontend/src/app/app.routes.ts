import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then(
        (modulo) => modulo.RegistroComponent
      ),
    // canActivate: [logeadoGuard],
    // canActivate:[authGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(
        (modulo) => modulo.LoginComponent
      ),
    // canActivate: [logeadoGuard],
    // canActivate:[authGuard]
  },
  {
    path: 'publicaciones',
    loadComponent: () =>
      import('./pages/publicaciones/publicaciones.component').then(
        (modulo) => modulo.PublicacionesComponent
      ),
    // canActivate: [logeadoGuard],
    // canActivate:[authGuard]
  },
  {
    path: 'mi-perfil',
    loadComponent: () =>
      import('./pages/mi-perfil/mi-perfil.component').then(
        (modulo) => modulo.MiPerfilComponent
      ),
    // canActivate: [logeadoGuard],
    // canActivate:[authGuard]
  },
];

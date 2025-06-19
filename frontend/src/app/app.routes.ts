import { Routes } from '@angular/router';
import { CrearPubliComponent } from './pages/publicaciones/crear-publi/crear-publi.component';

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
    path: 'publicaciones/crear',
    loadComponent: () =>
      import('./pages/publicaciones/crear-publi/crear-publi.component').then(
        (modulo) => modulo.CrearPubliComponent
      ),

    // canActivate: [logeadoGuard], // si aplica
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

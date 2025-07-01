import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  obtenerPerfil(): Observable<UsuarioModel> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('No hay token disponible'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<UsuarioModel>(
      environment.api_url + 'usuarios/perfil',
      {
        headers,
      }
    );
  }

  registrarUsuario(datos: any) {
    return this.http.post(environment.api_url + 'admin/users', datos);
  }
  getUsuarios(): Observable<UsuarioModel[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get<UsuarioModel[]>(environment.api_url + 'admin/users', {
      headers,
    });
  }
  darDeBaja(id: string) {
    return this.http.delete(environment.api_url + 'admin/users/' + id, {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + localStorage.getItem('token')
      ),
    });
  }

  darDeAlta(id: string) {
    return this.http.post(
      environment.api_url + 'admin/users/' + id + '/alta',
      {},
      {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Jwtpayload } from '../models/jwtpayload';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  traerPorId(id: number) {
    this.httpClient
      .get(environment.api_url + 'usuarios/' + id)
      .subscribe((datos) => {
        console.log(datos);
      });
  }

  modificarPorId(id: number) {
    this.httpClient
      .put(environment.api_url + 'usuarios/' + id, {
        clave: 'Valor',
        nombre: 'apellido',
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  eliminar(id: number) {
    this.httpClient
      .delete(environment.api_url + 'usuarios/' + id)
      .subscribe((data) => {
        console.log(data);
      });
  }

  obtenerUsuarioId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || null;
    } catch {
      return null;
    }
  }
  obtenerUsuario(): Jwtpayload | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      console.log(jwtDecode<Jwtpayload>(token));
      return jwtDecode<Jwtpayload>(token);
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  }
}

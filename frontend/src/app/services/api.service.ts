import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // GET a usuarios/
  traer() {
    this.httpClient.get(environment.api_url + 'usuarios').subscribe((datos) => {
      console.log(datos, 'datos desde el TRAER');
    });
  }

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
}

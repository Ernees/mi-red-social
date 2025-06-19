import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // POST a usuarios/
  crear(dataRegistro: FormData) {
    this.httpClient
      .post<{ access_token: string }>(
        environment.api_url + 'autenticacion/registro',
        dataRegistro
      )
      .subscribe((data) => {
        console.log(data, 'data desde CL');
        localStorage.setItem('token', data.access_token);
        console.log(localStorage.getItem('token'), 'token desde LS');
      });
  }

  // GET a usuarios/
  traer() {
    this.httpClient.get(environment.api_url + 'usuarios').subscribe((datos) => {
      console.log(datos, 'datos desde el TRAER');
    });
  }

  iniciarSesion(dataInicioSesion: { mail: string; password: string }) {
    console.log(`${dataInicioSesion.mail} y ${dataInicioSesion.password}`);

    this.httpClient
      .post<{ access_token: string }>(
        environment.api_url + 'autenticacion/login',
        dataInicioSesion
      )
      .subscribe((datos) => {
        console.log(datos);
        localStorage.setItem('token', datos.access_token);
        console.log(localStorage.getItem('token'), 'inciar sesion/apiservice');
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
}

import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // POST a usuarios/
  crear(formData: FormData) {
    this.httpClient
      .post(environment.api_url + 'autenticacion/registro', formData) //DUDA!
      .subscribe((data) => {
        console.log(data);
      });
  }

  // GET a usuarios/
  traer() {
    this.httpClient.get(environment.api_url + 'usuarios').subscribe((datos) => {
      console.log(datos);
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

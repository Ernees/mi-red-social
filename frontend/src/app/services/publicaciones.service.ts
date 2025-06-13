import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  constructor(private http: HttpClient) {}

  crearPubli(dataRegistro: FormData) {
    this.http
      .post(environment.api_url + 'publicaciones/alta', dataRegistro)
      .subscribe((data) => {
        console.log(data);
      });
  }
  obtenerPublicaciones(
    orden: 'fecha' | 'likes',
    offset: number,
    limit: number,
    usuarioId?: string
  ) {
    let params = new HttpParams()
      .set('orden', orden)
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    if (usuarioId) {
      params = params.set('usuarioId', usuarioId);
    }

    return this.http.get(environment.api_url, { params });
  }
}

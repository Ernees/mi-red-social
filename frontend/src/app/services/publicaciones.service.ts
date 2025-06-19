import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { PublicacionModel } from '../models/publicacion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  constructor(private http: HttpClient) {}

  crearPubli(dataRegistro: FormData) {
    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();

    console.log(headers);
    this.http
      .post(environment.api_url + 'publicaciones/alta', dataRegistro, {
        headers,
      })
      .subscribe({
        next: (data) => console.log('Publicacion creada:', data),
        error: (err) => console.warn('Error al crear publicación:', err.error),
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

    return this.http.get<{
      publicaciones: PublicacionModel[];
      total: number;
    }>(environment.api_url + 'publicaciones/traer', {
      params,
    });
  }

  darLike(publicacionId: string): Observable<{ likesCount: number }> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<{ likesCount: number }>(
      environment.api_url + 'publicaciones/' + publicacionId + '/like',
      {},
      { headers }
    );
  }

  quitarLike(publicacionId: string): Observable<{ likesCount: number }> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<{ likesCount: number }>(
      environment.api_url + 'publicaciones/' + publicacionId + '/unlike',
      {},
      { headers }
    );
  }
}

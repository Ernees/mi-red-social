import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComentarioModel } from '../models/comentario.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  constructor(private http: HttpClient) {}

  getComentariosPorPublicacion(
    publicacionId: string,
    page: number,
    limit: number
  ): Observable<ComentarioModel[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<ComentarioModel[]>(
      `${environment.api_url}comentarios/publicacion/${publicacionId}?page=${page}&limit=${limit}`,
      { params }
    );
  }
  editarComentario(
    comentarioId: string,
    contenido: string
  ): Observable<ComentarioModel> {
    return this.http.put<ComentarioModel>(
      `${environment.api_url}comentarios/${comentarioId}`,
      {
        contenido,
      }
    );
  }
  agregarComentario(
    comentario: Partial<ComentarioModel>
  ): Observable<ComentarioModel> {
    return this.http.post<ComentarioModel>(
      `${environment.api_url}comentarios`,
      comentario
    );
  }
}

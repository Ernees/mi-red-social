import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  constructor(private http: HttpClient) {}
  getPublicaciones(orden: 'fecha' | 'likes', pagina: number, limite: number) {
    const params = new HttpParams()
      .set('orden', orden)
      .set('pagina', pagina)
      .set('limite', limite);
    return this.http.get(`${environment.api_url}`, { params });
  }

  darLike(id: number) {
    return this.http.post(`${environment.api_url}/${id}/like`, {});
  }

  quitarLike(id: number) {
    return this.http.delete(`${environment.api_url}/${id}/like`);
  }
}

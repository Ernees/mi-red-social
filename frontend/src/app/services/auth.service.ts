import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';
import { map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timerId: any;
  constructor(public router: Router, private httpClient: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpirado(token: string): boolean {
    try {
      const datosDelToken: { exp: number } = jwtDecode(token);

      //fecha actual en segundos
      const ahora = Math.floor(Date.now() / 1000);

      //se compara con la fecha de expiración, si ya paso
      if (datosDelToken.exp < ahora) {
        return true; //el token esta expirado
      }

      return false; //el token todavia es valido
    } catch (error) {
      //si tira cualquier error retorna true, o sea istokenExpirado? true.
      return true;
    }
  }
  getDatosToken(token: string): any | null {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }
  verificarToken(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) return throwError(() => new Error('No token'));

    return this.httpClient.post(
      environment.api_url + 'autenticacion/autorizar',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/bienvenida');
  }
  estaLogueado(): boolean {
    const token = this.getToken();
    return token != null && !this.isTokenExpirado(token);
  }

  iniciarSesion(dataInicioSesion: {
    mail: string;
    password: string;
  }): Observable<void> {
    return this.httpClient
      .post<{ access_token: string }>(
        environment.api_url + 'autenticacion/login',
        dataInicioSesion
      )
      .pipe(
        tap((respuesta) => {
          localStorage.setItem('token', respuesta.access_token);
          this.iniciarTemporizador();
          this.router.navigateByUrl('/publicaciones');
        }),
        map(() => {})
      );
  }

  registrarse(dataRegistro: FormData): Observable<void> {
    return this.httpClient
      .post<{ access_token: string }>(
        environment.api_url + 'autenticacion/registro',
        dataRegistro
      )
      .pipe(
        tap((data) => {
          localStorage.setItem('token', data.access_token);
          this.iniciarTemporizador();
          this.router.navigateByUrl('/publicaciones');
        }),
        map(() => {})
      );
  }
  iniciarTemporizador() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      this.mostrarModalExtenderSesion();
    }, 10 * 60 * 1000);
  }

  mostrarModalExtenderSesion() {
    const confirmacion = confirm(
      'Quedan 5 minutos de sesión. ¿Deseás extenderla?'
    );
    if (confirmacion) {
      this.refrescarToken();
    }
  }

  refrescarToken() {
    const token = this.obtenerToken();
    if (!token) {
      // No token, no se refresca
      return;
    }

    this.httpClient
      .post<{ token: string }>(
        environment.api_url + '/autenticacion/refrescar-token',
        {},
        { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      )
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.iniciarTemporizador(); // Reiniciar el temporizador
        },
        error: (err) => {
          console.error('No se pudo refrescar token', err);
          // Podrías forzar logout o mostrar mensaje
        },
      });
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }
}

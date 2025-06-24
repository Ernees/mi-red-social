import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/bienvenida');
  }
  estaLogueado(): boolean {
    const token = this.getToken();
    return token != null && !this.isTokenExpirado(token);
  }

  iniciarSesion(dataInicioSesion: { mail: string; password: string }) {
    console.log(`${dataInicioSesion.mail} y ${dataInicioSesion.password}`);

    return this.httpClient.post<{ access_token: string }>(
      environment.api_url + 'autenticacion/login',
      dataInicioSesion
    );
  }
  registrarse(dataRegistro: FormData) {
    return this.httpClient.post<{ access_token: string }>(
      environment.api_url + 'autenticacion/registro',
      dataRegistro
    );
  }
}

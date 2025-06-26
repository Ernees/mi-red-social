import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SpinnerComponent } from './pages/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';

  constructor(public authService: AuthService, private router: Router) {}
  cargando = true;

  ngOnInit() {
    const esperaMinima = new Promise((resolve) => setTimeout(resolve, 1000));

    const validacionToken = this.authService.verificarToken();

    Promise.all([esperaMinima, validacionToken])
      .then(() => {
        this.router.navigate(['/publicaciones']);
      })
      .catch(() => {
        this.router.navigate(['/login']);
      })
      .finally(() => {
        this.cargando = false;
      });
  }
}

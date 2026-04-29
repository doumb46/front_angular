import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatCardModule }      from '@angular/material/card';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,
            MatFormFieldModule, MatInputModule, MatButtonModule,
            MatIconModule, MatCardModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginVal   = signal('');
  passwordVal= signal('');
  erreur     = signal('');
  loading    = signal(false);
  hidePass   = signal(true);

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.loginVal() || !this.passwordVal()) {
      this.erreur.set('Veuillez renseigner login et mot de passe.');
      return;
    }
    this.loading.set(true);
    this.erreur.set('');

    this.authService.loginHttp(this.loginVal(), this.passwordVal()).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading.set(false);
        this.erreur.set(err?.error?.error || 'Identifiants incorrects.');
      }
    });
  }
}

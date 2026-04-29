import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { MatButtonModule }   from '@angular/material/button';
import { MatIconModule }     from '@angular/material/icon';
import { MatDividerModule }  from '@angular/material/divider';
import { MatToolbarModule }  from '@angular/material/toolbar';
import { MatSidenavModule }  from '@angular/material/sidenav';
import { MatTooltipModule }  from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from './shared/auth.service';
import { APP_ENV }     from './shared/app-env';
import {AssignmentsService} from './shared/assignments.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatToolbarModule, MatSidenavModule, MatTooltipModule, MatSnackBarModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titre = 'Assignments ESATIC';


  constructor(
    public  authService: AuthService,
    private router:      Router,
    private http:        HttpClient,
    private snackBar:    MatSnackBar,
    private assignmentsService: AssignmentsService
  ) {}

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  // Appelle POST /api/auth/seed pour créer les comptes par défaut
  seedUsers() {
    const seedUrl = APP_ENV.assignmentsApiUrl.replace('/assignments', '/auth/seed');
    this.http.post(seedUrl, {}).subscribe({
      next: (r: any) => this.snackBar.open(r.message, 'OK', { duration: 3000 }),
      error: err     => this.snackBar.open(err?.error?.error || 'Erreur seed.', 'OK', { duration: 3000 })
    });
  }
  genererDonneesDeTest() {
    //this.assignmentsService.peuplerBD();
    // On appelle la méthode asynchrone du service pour peupler la BD, et on
    // s'abonne à la réponse pour savoir quand c'est terminé
    this.assignmentsService.peuplerBDAsynchrone()
      .subscribe((reponse) => {
        console.log('Peuplement de la BD terminé:', reponse);

        // On re-affiche la liste des assignments après le peuplement de la BD, pour voir les nouvelles données
        // this.router.navigate(['/home']); ne fonctionne pas car on est déjà
        // sur la page d'accueil, donc on peut faire :
        window.location.reload();
      });
  }
}

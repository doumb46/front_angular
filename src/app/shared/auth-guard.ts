import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAdmin()
  .then(isAdmin => {
    if (isAdmin) {
      // on autorise la navigation vers la route protégée
      console.log("GUARD : Navigation autorisée vers la route protégée");
      return true;
    } else {
      // on bloque la navigation vers la route protégée, et on redirige vers 
      // la page d'accueil
      console.log("GUARD : Navigation bloquée vers la route protégée, redirection vers la page d'accueil");
      router.navigate(['/home']);
      return false;
    }
  });

};

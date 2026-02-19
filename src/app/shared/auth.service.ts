import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // indique si on est loggué / authentifié ou pas
  loggedIn = false;

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAdmin() {
    // dans une vraie application, on aurait une logique plus complexe pour 
    // déterminer si l'utilisateur est admin ou pas, par exemple en regardant 
    // son rôle dans un token JWT, ou en faisant un appel HTTP vers le backend 
    // pour récupérer les infos de l'utilisateur connecté.

    // pour l'instant, on considère que si on est loggué, on est admin
    let promesse = new Promise<boolean>((resolve, reject) => {
      resolve(this.loggedIn);
    });

    return promesse; 
  }
}

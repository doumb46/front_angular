import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { APP_ENV } from './app-env';

export interface UserInfo {
  _id?: string;
  login: string;
  role: 'user' | 'admin';
  nom?: string;
  photo?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = APP_ENV.assignmentsApiUrl.replace('/assignments', '/auth');

  private _token: string | null = null;
  private _currentUser: UserInfo | null = null;

  constructor(private http: HttpClient) {
    // Restaurer depuis sessionStorage au démarrage
    this._token       = sessionStorage.getItem('jwt_token');
    const storedUser  = sessionStorage.getItem('current_user');
    if (storedUser) {
      try { this._currentUser = JSON.parse(storedUser); }
      catch { this._currentUser = null; }
    }
  }

  // ── Connexion ─────────────────────────────────────────────────
  loginHttp(login: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { login, password }).pipe(
      tap(response => {
        if (response?.token && response?.user) {
          this._token       = response.token;
          this._currentUser = response.user;
          sessionStorage.setItem('jwt_token',    this._token!);
          sessionStorage.setItem('current_user', JSON.stringify(this._currentUser));
        }
      })
    );
  }

  // ── Déconnexion ───────────────────────────────────────────────
  logOut(): void {
    this._token       = null;
    this._currentUser = null;
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('current_user');
  }

  // ── Accesseurs ────────────────────────────────────────────────
  getToken():       string | null  { return this._token; }
  getCurrentUser(): UserInfo | null { return this._currentUser; }
  isLogged():       boolean { return this._token !== null && this._currentUser !== null; }
  isAdmin():        boolean { return this._currentUser?.role === 'admin'; }
}

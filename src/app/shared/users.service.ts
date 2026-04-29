import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_ENV } from './app-env';

export interface UserPayload {
  login: string;
  password: string;
  role: 'user' | 'admin';
  nom?: string;
  photo?: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersUrl = APP_ENV.assignmentsApiUrl.replace('/assignments', '/users');

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  create(payload: UserPayload): Observable<any> {
    return this.http.post<any>(this.usersUrl, payload);
  }

  update(id: string, data: Partial<UserPayload>): Observable<any> {
    return this.http.put<any>(`${this.usersUrl}/${id}`, data);
  }

  remove(id: string): Observable<any> {
    return this.http.delete<any>(`${this.usersUrl}/${id}`);
  }
}

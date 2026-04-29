import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from './app-env';

@Injectable({ providedIn: 'root' })
export class AssignmentsService {
  constructor(private http: HttpClient) {}

  URI_BACKEND = APP_ENV.assignmentsApiUrl;

  getAssignmentsPagine(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.URI_BACKEND}?page=${page}&limit=${limit}`);
  }

  getAssignment(id: string): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.URI_BACKEND}/${id}`);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<any>(this.URI_BACKEND, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<any>(this.URI_BACKEND, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete<any>(`${this.URI_BACKEND}/${assignment._id}`);
  }

  peuplerBDAsynchrone(): Observable<any> {
    // conservé pour compatibilité — à adapter si nécessaire
    return forkJoin([]);
  }
}

import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from './app-env';
import bdInitialAssignments from './data';

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
    let appelsVersAddAssignment: Observable<any>[] = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment = new Assignment();

      // 🔹 champs existants
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      // 🔥 NOUVEAUX CHAMPS
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.photoAuteur = a.photoAuteur;

      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.imageMatiere = a.imageMatiere;

      nouvelAssignment.nomProf = a.nomProf;
      nouvelAssignment.photoProf = a.photoProf;

      nouvelAssignment.note = a.note;
      nouvelAssignment.remarques = a.remarques;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });

    return forkJoin(appelsVersAddAssignment);
  }

}

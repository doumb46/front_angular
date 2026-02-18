import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  constructor(private loggingService: LoggingService) {}

  assignments = [
    {
      nom: 'Devoir Angular de Michel Buffa',
      dateDeRendu: new Date('2026-04-30'),
      rendu: false,
    },
    {
      nom: 'Devoir Micro Services de Greg Galli !!!',
      dateDeRendu: new Date('2026-01-15'),
      rendu: true,
    },
    {
      nom: 'Devoir Java EE de Jean Dupont',
      dateDeRendu: new Date('2026-02-20'),
      rendu: true,
    },
  ];

  getAssignments():Observable<Assignment[]> {
    // typiquement : on ferait un appel HTTP vers un backend pour 
    // récupérer les données, ça peut prendre du temps, c'est pour ça que 
    // c'est mieux de faire ça dans un service, et pas dans le composant
    // et aussi renvoyer non pas les données directement, 
    // mais plutôt un Observable ou une Promise, pour gérer 
    // l'asynchronicité de l'appel HTTP. La norme en Angular, c'est d'utiliser 
    // des Observables, avec la librairie RxJS.
    return of(this.assignments);
  }

  addAssignment(assignment: Assignment): Observable<string> {
    this.assignments.push(assignment);

    this.loggingService.log(assignment.nom, 'ajouté');

    return of('Assignment ajouté avec succès !');
  }

  updateAssignment(assignment: Assignment): Observable<string> {
    // dans une vraie application, on ferait un appel HTTP PUT 
    // vers le backend pour mettre à jour l'assignment, 
    // et on gérerait la réponse du backend pour savoir si la mise à jour 
    // a réussi ou pas. Ici, pour simplifier, on va juste retourner 
    // un Observable avec un message de succès.

      this.loggingService.log(assignment.nom, 'mis à jour');

      return of('Assignment mis à jour dans le service !');
  }

  deleteAssignment(assignment: Assignment): Observable<string> {
    // on supprime avec splice() l'assignment du tableau des assignments
    // car avec filter cela crée un nouveau tableau et du coup ça ne 
    // fonctionne pas car le signal référence toujours l'ancien
    //  dans le composant parent. Donc -> utiliser splice
    const pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    this.loggingService.log(assignment.nom, 'supprimé');
    
    return of('Assignment supprimé avec succès !');
  }
}

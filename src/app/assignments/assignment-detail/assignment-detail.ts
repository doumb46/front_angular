import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';


@Component({
  selector: 'app-assignment-detail',
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.css',
})
export class AssignmentDetail {
  // on récupère le signal de l'assignment sélectionné depuis 
  // le composant parent. Correspond à [assignmentTransmis]="assignmentSelectionne" dans le template du composant parent
  // Correspond à l'ancien @Input() assignmentTransmis: Assignment | null = null; dans le composant enfant
  assignmentTransmis = input<Assignment | null>(null);

  // evenement custom pour deleteAssignment vers le père
  deleteAssignment = output<Assignment>();

  constructor(private assignmentsService: AssignmentsService) {}

  onAssignmentRendu() {
    // astuce : pour éviter les problèmes de null, 
    // on peut faire un if ou alors utiliser l'opérateur "?" 
    // pour dire "si assignmentTransmis n'est pas null, 
    // ou alors on fait ceci:"
    const assignment = this.assignmentTransmis();

    if(assignment) {
      assignment.rendu = ! assignment.rendu;
      this.assignmentsService.updateAssignment(assignment).subscribe(result => {
        console.log(result);
      });
    }
  }

  onDeleteAssignment() {
    // on va devoir envoyer un événement vers le composant parent pour lui dire de supprimer cet assignment de la liste des assignments
    const assignment = this.assignmentTransmis();

    /*
    if (assignment) {
      this.deleteAssignment.emit(assignment);
    }
      */

    if (assignment) {
      this.assignmentsService.deleteAssignment(assignment)
      .subscribe(result => {
        console.log(result);

        // On prévient le père pour cacher le détail de l'assignment qui vient 
        // d'être supprimé
        this.deleteAssignment.emit(assignment);
      });
    }
  }
}

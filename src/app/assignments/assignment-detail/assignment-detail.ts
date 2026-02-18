import { Component, computed, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-assignment-detail',
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.css',
})
export class AssignmentDetail implements OnInit {
  private readonly assignmentFromRoute = signal<Assignment | null>(null);

  assignmentAffiche = signal<Assignment | null>(null);

  // evenement custom pour deleteAssignment vers le père
  deleteAssignment = output<Assignment>();

  constructor(private assignmentsService: AssignmentsService,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  ngOnInit() {
    console.log("AssignmentDetail ngOnInit called");
    const id = +this.route.snapshot.params['id'];

    console.log("id from URL : ", id);

    // on va chercher dans le service l'assignment avec cet id
    this.assignmentsService.getAssignment(id)
    .subscribe(assignment => {
      console.log("Assignment from service : ", assignment);
      this.assignmentAffiche.set(assignment ?? null);
    });
  };

  onAssignmentRendu() {
    // astuce : pour éviter les problèmes de null, 
    // on peut faire un if ou alors utiliser l'opérateur "?" 
    // pour dire "si assignmentAffiche n'est pas null, 
    // ou alors on fait ceci:"
    const assignment = this.assignmentAffiche();

    if(assignment) {
      assignment.rendu = ! assignment.rendu;
      this.assignmentsService.updateAssignment(assignment).subscribe(result => {
        console.log(result);

        // on va naviguer programmatiquement vers la page d'accueil après la mise à jour,
        this.router.navigate(['/']);
      });
    }
  }

  onDeleteAssignment() {
    // on va devoir envoyer un événement vers le composant parent pour lui dire de supprimer cet assignment de la liste des assignments
    const assignment = this.assignmentAffiche();

    if (assignment) {
      this.assignmentsService.deleteAssignment(assignment)
      .subscribe(result => {
        console.log(result);

        // on va naviguer programmatiquement vers la page d'accueil après la suppression, 
        // pour éviter d'avoir une page de détail d'un devoir qui n'existe plus
        this.router.navigate(['/']);
      });
    }
  }
}

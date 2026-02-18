import { Component, OnInit, signal,ChangeDetectionStrategy  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { RouterLink } from '@angular/router';

import { Rendu } from '../shared/rendu';
import { NonRendu } from '../shared/non-rendu';
import { ImportantDirective } from '../shared/important.directive';
import { Assignment } from './assignment.model';
import { AssignmentDetail } from './assignment-detail/assignment-detail';
import { AddAssignment } from './add-assignment/add-assignment';
import { AssignmentsService } from '../shared/assignments.service';
@Component({
  selector: 'app-assignments',
  imports: [MatDividerModule, Rendu, NonRendu, ImportantDirective,
     AssignmentDetail, MatListModule, MatButtonModule,
    CommonModule, AddAssignment, RouterLink
  ],
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Assignments implements OnInit {
  titre = "Liste des Assignments";
  ajoutActive = signal(true);

  // un tableau avec une liste de devoirs (assignments en anglais)
  assignments = signal<Assignment[]>([]);

  constructor(private assignmentsService: AssignmentsService) {}

  // appelée à l'initialisation du composant
  // avant de faire l'affichage
  ngOnInit(): void {
    console.log("ngOnInit appelé !!!");

    this.assignmentsService.getAssignments()
    .subscribe(assignments => {
      // on ne rentre ici que lorsque les données observables renvoyées
      // par getAssignments() sont disponibles, c'est à dire quel'appel 
      // HTTP est terminé et que les données sont arrivées. 
      // C'est pour ça que c'est mieux de faire l'appel HTTP dans un service, 
      // et pas dans le composant, pour gérer l'asynchronicité de l'appel HTTP.
      this.assignments.set(assignments);
    });
    /*
    // appelées à l'initialisation du composant
    // avant de faire l'affichage, on peut faire des traitements pour 
    // préparer les données etc.

    // Pour le moment, je m'en sers pour montre l'aspect "réactif" d'Angular : 
    // après 3 secondes on va rendre le bouton enabled
    setTimeout(() => {
      this.ajoutActive.set(true);
      console.log("Bouton d'ajout activé !!!");
    }, 3000);

    // et on va ajouter un devoir après 5 secondes
    setTimeout(() => {
      this.assignments.update(list => [
        ...list,
        {
          nom: "NOUVEAU DEVOIR pour montrer la réactivité d'Angular !!!",
          dateDeRendu: new Date("2026-04-30"),
          rendu : false
        }
      ]);
      console.log('Nouveau devoir ajouté !!!');
    }, 5000);
    */
  }

  // any = en typescript, c'est un type générique qui peut représenter 
  // n'importe quel type de données. Typiquement, on l'utilise lorsque 
  // le type de données n'est pas connu à l'avance ou peut varier.
  getColor(assignment: any) {
    if (assignment.rendu) {
      return 'green';
    } else {
      return 'red';
    }
  }
}

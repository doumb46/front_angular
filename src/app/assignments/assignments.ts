import { Component, OnInit, signal,ChangeDetectionStrategy  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { provideNativeDateAdapter } from '@angular/material/core';


import { Rendu } from '../shared/rendu';
import { NonRendu } from '../shared/non-rendu';
import { ImportantDirective } from '../shared/important.directive';
import { Assignment } from './assignment.model';
import { AssignmentDetail } from './assignment-detail/assignment-detail';
import { AddAssignment } from './add-assignment/add-assignment';
@Component({
  selector: 'app-assignments',
  imports: [MatDividerModule, Rendu, NonRendu, ImportantDirective,
     AssignmentDetail, MatListModule, MatButtonModule,
    CommonModule, AddAssignment
  ],
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Assignments implements OnInit {
  titre = "Liste des Assignments";
  ajoutActive = signal(true);

  // pour cacher/afficher le formulaire d'ajout d'un devoir
  formVisible = false;

  // Pour la transmission vers le composant fils, avec un signal
  //
  assignmentSelectionne = signal<Assignment | null>(null);

  // un tableau avec une liste de devoirs (assignments en anglais)
  assignments = signal([
    { 
      nom: "Devoir Angular de Michel Buffa",
      dateDeRendu: new Date("2026-04-30"),
      rendu : false
    },
    { 
      nom: "Devoir Micro Services de Greg Galli !!!",
      dateDeRendu: new Date("2026-01-15"),
      rendu : true
    },
    { 
      nom: "Devoir Java EE de Jean Dupont",
      dateDeRendu: new Date("2026-02-20"),
      rendu : true
    }
  ]);

  ngOnInit(): void {
    console.log("ngOnInit appelé !!!");
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

  onAddAssignmentBtnClick() {
    console.log("Bouton d'ajout cliqué !!!");
    // on peut faire des traitements pour préparer l'ajout d'un devoir
    // par exemple, on peut afficher un formulaire pour saisir les 
    // informations du devoir à ajouter, etc.
    this.formVisible = true;
  }

  assignmentClique(a: Assignment) {
    console.log("Assignment cliqué : ", a.nom);

    // on met à jour le signal de l'assignment sélectionné
    this.assignmentSelectionne.set(a);
  }

  ajoutAssignment(assignment: Assignment) {
    console.log("Assignment à ajouter : ", assignment.nom);

    this.assignments.update(list => [...list, assignment]);

    this.formVisible = false; // on cache le formulaire après l'ajout
  }
}

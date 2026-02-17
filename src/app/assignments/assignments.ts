import { Component, OnInit, signal,ChangeDetectionStrategy  } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

import { FormsModule } from '@angular/forms';

import { Rendu } from '../shared/rendu';
import { NonRendu } from '../shared/non-rendu';
import { ImportantDirective } from '../shared/important.directive';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  imports: [MatDividerModule, Rendu, NonRendu, ImportantDirective,
    MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, 
    MatDatepickerModule
  ],
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Assignments implements OnInit {
  titre = "Liste des Assignments";
  ajoutActive = signal(true);

  // Pour les champs du formulaire d'ajout d'un devoir
  nomDevoir = signal('');
  // Je veux une date de rendu "vide" par défaut
  dateDeRendu = signal(new Date());

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

  onSubmit(event:any) {
    console.log("Form submitted !!!");
    // on ajoute () à la fin de this.nomDevoir pour récupérer la valeur 
    // actuelle du signal !
    console.log("Nom du devoir : ", this.nomDevoir());
    console.log("Date de rendu : ", this.dateDeRendu());

    // on peut faire l'ajout :
    // on crée un nouvel objet de type Assignment
    const newAssignment= new Assignment();
    newAssignment.nom = this.nomDevoir();
    newAssignment.dateDeRendu = this.dateDeRendu();
    // on ajoute ce nouvel assignment au tableau des assignments
    this.assignments.update(list => [...list, newAssignment]);
    
    // on peut aussi réinitialiser les champs du formulaire
    //this.nomDevoir.set('');
    //this.dateDeRendu.set(new Date());
  }
}

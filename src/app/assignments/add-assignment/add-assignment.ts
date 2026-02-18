import { Component, output, signal } from '@angular/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';

import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule,
     MatButtonModule, FormsModule],
  templateUrl: './add-assignment.html',
  styleUrl: './add-assignment.css',
})
export class AddAssignment {
// Pour les champs du formulaire d'ajout d'un devoir
  nomDevoir = signal('');
  // Je veux une date de rendu "vide" par défaut
  dateDeRendu = signal(new Date());

  // on utilise output pour transmettre le nouvel assignment créé vers 
  // le composant parent. "assignmentAjoute" correspond à 
  // (assignmentAjoute)="ajoutAssignment($event)" dans le template du 
  // composant parent. assignementAjoute est un evenement custom
  // que je crée pour transmettre le nouvel assignment créé vers le
  // composant parent. On utilisera la méthode emit() pour émettre cet événement avec le nouvel assignment à transmettre
  // voir la méthode onSubmit() ci-dessous pour l'utilisation de emit()
  assignmentAjoute = output<Assignment>();

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

      // on va transmettre ce nouvel assignment au composant parent, 
      // en utilisant output
      this.assignmentAjoute.emit(newAssignment); // on émet le nouvel assignment
      
    }
  
}

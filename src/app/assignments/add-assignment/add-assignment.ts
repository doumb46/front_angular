import { Component, output, signal } from '@angular/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-add-assignment',
  imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule,
     MatButtonModule, FormsModule],
  templateUrl: './add-assignment.html',
  styleUrl: './add-assignment.css',
  providers: [provideNativeDateAdapter()],
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

  constructor(private assignementService: AssignmentsService,
              private router: Router) {}

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
      newAssignment.rendu = false; 
      // pour générer un id aléatoire, à remplacer 
      // par un vrai id généré par le backend dans une 
      // vraie application
      newAssignment.id = Math.floor(Math.random() * 1000000); 

      // On utilise le service pour ajouter le devoir à la liste des devoirs
      this.assignementService.addAssignment(newAssignment)
      .subscribe(result => {
        console.log(result);

        // On prévient le père pour ajouter le devoir à la liste des devoirs affichés
        //this.assignmentAjoute.emit(newAssignment); // on émet le nouvel assignment
      
        // ici on va devoir faire une navigation "par programme" 
        // vers la page d'accueil (la liste des devoirs), 
        // pour revenir à la liste après l'ajout du devoir.
        this.router.navigate(['/']);
      });
  
    }
  
}

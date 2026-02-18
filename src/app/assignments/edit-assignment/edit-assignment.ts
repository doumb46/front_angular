import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './edit-assignment.html',
  styleUrl: './edit-assignment.css',
})
export class EditAssignment implements OnInit {
  // variable qui correspond à l'assignment affiché dans le formulaire 
  // d'édition. C'est un signal
  assignementAffiche = signal<Assignment | null>(null);

  // Pour les champs du formulaire d'ajout d'un devoir
  // ils sont associés par binding bi directionnel aux champs
  // input du formulaire. Ce sont eux-aussi des signaux
  nomDevoir = signal('');
  // Je veux une date de rendu "vide" par défaut
  dateDeRendu = signal(new Date());

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  // appelée à l'initialisation du composant, avant l'affichage
  ngOnInit(): void {
    // on va chercher l'assignment à modifier, en lisant l'id dans l'URL
    this.getAssignment();
  }

  getAssignment() {
    // On va utiliser ActivatedRoute pour lire l'id dans l'URL
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id)
    .subscribe((a) => {

      if (a === undefined) return;

      // on modifie le modèle pour afficher les données de l'assignment dans 
      // le formulaire d'édition
      this.assignementAffiche.set(a);

      // on remplit aussi les champs du formulaire d'édition avec les données 
      // de l'assignment qu'on vient de recevoir
      this.nomDevoir.set(a.nom);
      this.dateDeRendu.set(a.dateDeRendu);
    });
  }

  // appelé quand le formulaire de modification est soumis
  onSaveAssignment() {
    const assignment = this.assignementAffiche();

    if (!assignment) return;

    if (this.nomDevoir() == '' || this.dateDeRendu() === undefined) return;

    // on récupère les valeurs dans le formulaire
    assignment.nom = this.nomDevoir();
    assignment.dateDeRendu = this.dateDeRendu();

    this.assignmentsService.updateAssignment(assignment)
    .subscribe((message) => {
      console.log(message);

      // navigation vers la home page
      this.router.navigate(['/home']);
    });
  }
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDatepickerModule }  from '@angular/material/datepicker';
import { MatInputModule }       from '@angular/material/input';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatButtonModule }      from '@angular/material/button';
import { MatSelectModule }      from '@angular/material/select';
import { MatIconModule }        from '@angular/material/icon';
import { MatCardModule }        from '@angular/material/card';
import { MatDividerModule }     from '@angular/material/divider';
import { MatSliderModule }      from '@angular/material/slider';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Assignment, MATIERES, MatiereInfo } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService }        from '../../shared/auth.service';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatDatepickerModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatSelectModule, MatIconModule,
    MatCardModule, MatDividerModule, MatSliderModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-assignment.html',
  styleUrl: './add-assignment.css'
})
export class AddAssignment {
  matieres = MATIERES;

  nom          = signal('');
  dateDeRendu  = signal<Date | null>(null);
  auteur       = signal('');
  matiereChoisie = signal<MatiereInfo | null>(null);
  note         = signal<number | null>(null);
  remarques    = signal('');

  envoiEnCours = signal(false);
  erreur       = signal('');

  constructor(
    private assignmentsService: AssignmentsService,
    protected authService: AuthService,
    private router: Router
  ) {
    // Pré-remplir l'auteur avec le nom de l'utilisateur connecté
    const user = this.authService.getCurrentUser();
    if (user?.nom) this.auteur.set(user.nom);
    this.authService.isAdmin();
  }

  onMatiereChange(m: MatiereInfo) {
    this.matiereChoisie.set(m);
  }

  onSubmit() {
    if (!this.nom() || !this.dateDeRendu()) {
      this.erreur.set('Le nom et la date de rendu sont obligatoires.');
      return;
    }
    this.envoiEnCours.set(true);
    this.erreur.set('');

    const a = new Assignment();
    a.nom         = this.nom();
    a.dateDeRendu = this.dateDeRendu()!;
    a.rendu       = false;
    a.auteur      = this.auteur();
    a.note        = this.note();
    a.remarques   = this.remarques();

    const m = this.matiereChoisie();
    if (m) {
      a.matiere      = m.nom;
      a.imageMatiere = m.image;
      a.nomProf      = m.prof;
      a.photoProf    = m.photoProf;
    }

    this.assignmentsService.addAssignment(a).subscribe({
      next: () => { this.envoiEnCours.set(false); this.router.navigate(['/']); },
      error: err => { this.envoiEnCours.set(false); this.erreur.set(err?.error?.error || 'Erreur lors de la création.'); }
    });
  }

  annuler() { this.router.navigate(['/']); }
}

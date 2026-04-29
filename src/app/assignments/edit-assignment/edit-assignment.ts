import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDatepickerModule }  from '@angular/material/datepicker';
import { MatInputModule }       from '@angular/material/input';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatButtonModule }      from '@angular/material/button';
import { MatSelectModule }      from '@angular/material/select';
import { MatIconModule }        from '@angular/material/icon';
import { MatCardModule }        from '@angular/material/card';
import { MatDividerModule }     from '@angular/material/divider';
import { MatCheckboxModule }    from '@angular/material/checkbox';
import { MatTooltipModule }     from '@angular/material/tooltip';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Assignment, MATIERES, MatiereInfo } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService }        from '../../shared/auth.service';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatDatepickerModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatSelectModule, MatIconModule,
    MatCardModule, MatDividerModule, MatCheckboxModule, MatTooltipModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-assignment.html',
  styleUrl: './edit-assignment.css'
})
export class EditAssignment implements OnInit {
  matieres = MATIERES;

  assignment = signal<Assignment | null>(null);

  // Champs éditables
  nom          = signal('');
  dateDeRendu  = signal<Date | null>(null);
  rendu        = signal(false);
  auteur       = signal('');
  matiereChoisie = signal<MatiereInfo | null>(null);
  note         = signal<number | null>(null);
  remarques    = signal('');

  envoiEnCours = signal(false);
  erreur       = signal('');

  constructor(
    private assignmentsService: AssignmentsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(a => {
      if (!a) return;
      this.assignment.set(a);
      this.nom.set(a.nom || '');
      this.dateDeRendu.set(a.dateDeRendu ? new Date(a.dateDeRendu) : null);
      this.rendu.set(a.rendu || false);
      this.auteur.set(a.auteur || '');
      this.note.set(a.note ?? null);
      this.remarques.set(a.remarques || '');

      // Retrouver la matière correspondante dans la liste fixe
      if (a.matiere) {
        const found = this.matieres.find(m => m.nom === a.matiere);
        if (found) this.matiereChoisie.set(found);
      }
    });
  }

  onMatiereChange(m: MatiereInfo) {
    this.matiereChoisie.set(m);
  }

  onRenduChange(val: boolean) {
    if (val && (this.note() === null || this.note() === undefined)) {
      this.erreur.set('Impossible de marquer comme rendu sans note. Attribuez d\'abord une note.');
      return;
    }
    this.erreur.set('');
    this.rendu.set(val);
  }

  onSubmit() {
    if (!this.nom() || !this.dateDeRendu()) {
      this.erreur.set('Le nom et la date de rendu sont obligatoires.');
      return;
    }
    if (this.rendu() && (this.note() === null || this.note() === undefined)) {
      this.erreur.set('Une note est requise pour marquer l\'assignment comme rendu.');
      return;
    }
    this.envoiEnCours.set(true);
    this.erreur.set('');

    const original = this.assignment()!;
    const m = this.matiereChoisie();

    const updated: Assignment = {
      ...original,
      nom:          this.nom(),
      dateDeRendu:  this.dateDeRendu()!,
      rendu:        this.rendu(),
      auteur:       this.auteur(),
      note:         this.note(),
      remarques:    this.remarques(),
      matiere:      m?.nom      || original.matiere      || '',
      imageMatiere: m?.image    || original.imageMatiere || '',
      nomProf:      m?.prof     || original.nomProf      || '',
      photoProf:    m?.photoProf|| original.photoProf    || ''
    };

    this.assignmentsService.updateAssignment(updated).subscribe({
      next: () => {
        this.envoiEnCours.set(false);
        this.router.navigate(['/assignments', original._id]);
      },
      error: err => {
        this.envoiEnCours.set(false);
        this.erreur.set(err?.error?.error || 'Erreur lors de la mise à jour.');
      }
    });
  }

  annuler() {
    const a = this.assignment();
    if (a) this.router.navigate(['/assignments', a._id]);
    else this.router.navigate(['/']);
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule }     from '@angular/material/card';
import { MatButtonModule }   from '@angular/material/button';
import { MatIconModule }     from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule }    from '@angular/material/chips';
import { MatDividerModule }  from '@angular/material/divider';
import { MatTooltipModule }  from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService }        from '../../shared/auth.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule,
    MatCheckboxModule, MatChipsModule, MatDividerModule,
    MatTooltipModule, MatDialogModule
  ],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.css'
})
export class AssignmentDetail implements OnInit {
  assignment = signal<Assignment | null>(null);

  constructor(
    private assignmentsService: AssignmentsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(a => {
      this.assignment.set(a ?? null);
    });
  }

  onToggleRendu() {
    const a = this.assignment();
    if (!a) return;

    // On ne peut marquer "rendu" que si une note est présente
    if (!a.rendu && (a.note === null || a.note === undefined)) {
      alert('Vous devez d\'abord attribuer une note avant de marquer cet assignment comme rendu.');
      return;
    }
    a.rendu = !a.rendu;
    this.assignmentsService.updateAssignment(a).subscribe(() => {
      this.assignment.set({ ...a });
    });
  }

  onEdit() {
    const a = this.assignment();
    if (a) this.router.navigate(['/assignments', a._id, 'edit']);
  }

  onDelete() {
    const a = this.assignment();
    if (!a) return;
    const ref = this.dialog.open(ConfirmDialogComponent, { data: { nom: a.nom } });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.assignmentsService.deleteAssignment(a).subscribe(() => this.router.navigate(['/']));
      }
    });
  }

  getNoteColor(note: number | null | undefined): string {
    if (note === null || note === undefined) return '#999';
    if (note >= 14) return '#2e7d32';
    if (note >= 10) return '#f57f17';
    return '#c62828';
  }

  getNoteLabel(note: number | null | undefined): string {
    if (note === null || note === undefined) return 'Non noté';
    if (note >= 16) return 'Très bien';
    if (note >= 14) return 'Bien';
    if (note >= 12) return 'Assez bien';
    if (note >= 10) return 'Passable';
    return 'Insuffisant';
  }
}

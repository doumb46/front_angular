import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule }    from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule }   from '@angular/material/button';
import { MatIconModule }     from '@angular/material/icon';
import { MatTooltipModule }  from '@angular/material/tooltip';
import { MatChipsModule }    from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule }  from '@angular/material/divider';
import { MatBadgeModule }    from '@angular/material/badge';

import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule,
    MatTooltipModule, MatChipsModule, MatDialogModule, MatDividerModule, MatBadgeModule
  ],
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Assignments implements OnInit {
  titre = 'Liste des Assignments';

  page = 1; limit = 10;
  totalDocs = 0; totalPages = 0;
  hasPrevPage = false; hasNextPage = false;
  prevPage = 1; nextPage = 1;

  assignments = signal<Assignment[]>([]);

  displayedColumns: string[] = [
    'auteur', 'assignment-nom', 'matiere',
    'assignment-dateDeRendu', 'note', 'assignment-rendu', 'actions'
  ];

  constructor(
    private assignmentsService: AssignmentsService,
    public authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void { this.getAssignments(); }

  getAssignments() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
      this.totalDocs   = data.totalDocs;
      this.totalPages  = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      this.prevPage    = data.prevPage;
      this.nextPage    = data.nextPage;
      this.assignments.set(data.docs);
    });
  }

  pageChange(event: any) {
    this.limit = event.pageSize;
    this.page  = event.pageIndex + 1;
    this.getAssignments();
  }

  onRowClick(row: Assignment) {
    this.router.navigate(['/assignments', row._id]);
  }

  onEdit(event: Event, row: Assignment) {
    event.stopPropagation();
    this.router.navigate(['/assignments', row._id, 'edit']);
  }

  onDelete(event: Event, row: Assignment) {
    event.stopPropagation();
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { nom: row.nom }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.assignmentsService.deleteAssignment(row).subscribe(() => this.getAssignments());
      }
    });
  }

  getRenduClass(rendu: boolean) {
    return rendu ? 'chip-rendu' : 'chip-non-rendu';
  }

  getNoteColor(note: number | null | undefined): string {
    if (note === null || note === undefined) return '#999';
    if (note >= 14) return '#2e7d32';
    if (note >= 10) return '#f57f17';
    return '#c62828';
  }
}

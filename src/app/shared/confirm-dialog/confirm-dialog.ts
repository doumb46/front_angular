import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule }   from '@angular/material/icon';

export interface ConfirmDialogData { nom: string; }

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-header">
      <mat-icon class="warn-icon">warning_amber</mat-icon>
      <h2 mat-dialog-title>Confirmer la suppression</h2>
    </div>
    <mat-dialog-content>
      <p>Voulez-vous vraiment supprimer l'assignment :</p>
      <p class="assignment-name">« {{ data.nom }} »</p>
      <p class="warn-text">Cette action est irréversible.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button [mat-dialog-close]="false">
        <mat-icon>close</mat-icon> Annuler
      </button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">
        <mat-icon>delete</mat-icon> Supprimer
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px 24px 0;
    }
    .warn-icon { color: #e65100; font-size: 32px; height: 32px; width: 32px; }
    h2 { margin: 0; font-size: 18px; }
    mat-dialog-content { padding-top: 8px !important; }
    .assignment-name {
      font-weight: 700;
      font-size: 16px;
      color: #1a237e;
      background: #e8eaf6;
      padding: 8px 12px;
      border-radius: 6px;
      margin: 8px 0;
    }
    .warn-text { color: #c62828; font-size: 13px; }
    mat-dialog-actions { padding: 8px 16px 16px !important; gap: 8px; }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}
}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatTableModule }     from '@angular/material/table';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatSelectModule }    from '@angular/material/select';
import { MatCardModule }      from '@angular/material/card';
import { MatDividerModule }   from '@angular/material/divider';
import { MatTooltipModule }   from '@angular/material/tooltip';
import { MatChipsModule }     from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { UsersService, UserPayload } from '../shared/users.service';
import { AuthService }               from '../shared/auth.service';
import { ConfirmDialogComponent }    from '../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatCardModule, MatDividerModule, MatTooltipModule,
    MatChipsModule, MatDialogModule, MatSnackBarModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  users = signal<any[]>([]);
  loading = signal(false);
  erreur  = signal('');

  // Formulaire d'ajout
  showForm  = signal(false);
  newLogin    = signal('');
  newPassword = signal('');
  newNom      = signal('');
  newRole     = signal<'user' | 'admin'>('user');
  newPhoto    = signal('');
  formLoading = signal(false);
  formErreur  = signal('');
  hideNewPass = signal(true);

  displayedColumns = ['avatar', 'login', 'nom', 'role', 'createdAt', 'actions'];

  constructor(
    private usersService: UsersService,
    public  authService:  AuthService,
    private dialog:       MatDialog,
    private snackBar:     MatSnackBar
  ) {}

  ngOnInit() { this.loadUsers(); }

  loadUsers() {
    this.loading.set(true);
    this.erreur.set('');
    this.usersService.getAll().subscribe({
      next: list => { this.users.set(list); this.loading.set(false); },
      error: err  => { this.erreur.set(err?.error?.error || 'Erreur de chargement.'); this.loading.set(false); }
    });
  }

  toggleForm() {
    this.showForm.set(!this.showForm());
    this.resetForm();
  }

  resetForm() {
    this.newLogin.set('');
    this.newPassword.set('');
    this.newNom.set('');
    this.newRole.set('user');
    this.newPhoto.set('');
    this.formErreur.set('');
  }

  onCreateUser() {
    if (!this.newLogin() || !this.newPassword()) {
      this.formErreur.set('Login et mot de passe sont obligatoires.');
      return;
    }
    if (this.newPassword().length < 6) {
      this.formErreur.set('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }
    this.formLoading.set(true);
    this.formErreur.set('');

    const payload: UserPayload = {
      login:    this.newLogin(),
      password: this.newPassword(),
      role:     this.newRole(),
      nom:      this.newNom(),
      photo:    this.newPhoto()
    };

    this.usersService.create(payload).subscribe({
      next: () => {
        this.formLoading.set(false);
        this.showForm.set(false);
        this.resetForm();
        this.loadUsers();
        this.snackBar.open('Utilisateur créé avec succès !', 'OK', { duration: 3000 });
      },
      error: err => {
        this.formLoading.set(false);
        this.formErreur.set(err?.error?.error || 'Erreur lors de la création.');
      }
    });
  }

  onDelete(user: any) {
    if (user._id === this.authService.getCurrentUser()?._id) {
      this.snackBar.open('Vous ne pouvez pas supprimer votre propre compte.', 'OK', { duration: 3000 });
      return;
    }
    const ref = this.dialog.open(ConfirmDialogComponent, { data: { nom: user.login } });
    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.usersService.remove(user._id).subscribe({
        next: () => {
          this.loadUsers();
          this.snackBar.open('Utilisateur supprimé.', 'OK', { duration: 3000 });
        },
        error: err => this.snackBar.open(err?.error?.error || 'Erreur lors de la suppression.', 'OK', { duration: 4000 })
      });
    });
  }

  getRoleColor(role: string): string {
    return role === 'admin' ? 'warn' : 'primary';
  }

  isSelf(user: any): boolean {
    return user._id === this.authService.getCurrentUser()?._id;
  }
}

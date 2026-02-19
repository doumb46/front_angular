import { Routes } from '@angular/router';
import { Assignments } from './assignments/assignments';
import { AddAssignment } from './assignments/add-assignment/add-assignment';
import { AssignmentDetail } from './assignments/assignment-detail/assignment-detail';
import { EditAssignment } from './assignments/edit-assignment/edit-assignment';

import { authGuard } from './shared/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Assignments},
    { path: 'add', component: AddAssignment},
    { path: 'assignments/:id', component: AssignmentDetail}, 
    {
      path: 'assignments/:id/edit', 
      component: EditAssignment, 
      // restriction d'accès : le guardien doit renvoyer "true" pour que la 
      // navigation vers cette route soit autorisée, sinon la navigation est 
      // bloquée
      canActivate: [authGuard] // on pourrait avoir plusieurs guards, 
      // par exemple un guard pour vérifier que l'utilisateur est connecté, 
      // et un autre pour vérifier que c'est un admin, etc.
    }, 
    
];

import { Routes } from '@angular/router';
import { Assignments }       from './assignments/assignments';
import { AddAssignment }     from './assignments/add-assignment/add-assignment';
import { AssignmentDetail }  from './assignments/assignment-detail/assignment-detail';
import { EditAssignment }    from './assignments/edit-assignment/edit-assignment';
import { Login }             from './login/login';
import { authGuard, adminGuard } from './shared/auth-guard';
import {Users} from './users/users';

export const routes: Routes =[
  { path: '',                   redirectTo: '/home', pathMatch: 'full' },
  { path: 'login',              component: Login },
  { path: 'home',               component: Assignments },
  { path: 'add',                component: AddAssignment,   canActivate: [authGuard] },
  { path: 'assignments/:id',    component: AssignmentDetail,canActivate: [authGuard] },
  { path: 'assignments/:id/edit', component: EditAssignment, canActivate: [authGuard, adminGuard] },
  { path: 'users',              component: Users,           canActivate: [authGuard, adminGuard] },
  { path: '**',                 redirectTo: '/home' }
];

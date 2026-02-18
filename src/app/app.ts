import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

import { Assignments } from './assignments/assignments';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, 
    MatDividerModule, Assignments, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titre = "Application de gestion des assignments !!!";
}

import { Component } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-assignments',
  imports: [MatDividerModule],
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
})
export class Assignments {
  titre = "Liste des Assignments";

  // un tableau avec une liste de devoirs (assignments en anglais)
  assignments = [
    { 
      nom: "Devoir Angular de Michel Buffa",
      dateDeRendu: "2026-04-30",
      rendu : false
    },
    { 
      nom: "Devoir Micro Services de Greg Galli",
      dateDeRendu: "2026-01-15",
      rendu : true
    },
    { 
      nom: "Devoir Java EE de Jean Dupont",
      dateDeRendu: "2026-02-20",
      rendu : true
    }
  ];
}

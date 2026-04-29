export class Assignment {
  _id!: string;
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
  auteur?: string;
  photoAuteur?: string;
  matiere?: string;
  imageMatiere?: string;
  nomProf?: string;
  photoProf?: string;
  note?: number | null;
  remarques?: string;
}

// ─── Données fixes des matières ────────────────────────────────
export interface MatiereInfo {
  nom: string;
  image: string;    // URL d'une image illustrant la matière
  prof: string;     // nom du professeur
  photoProf: string;// photo du professeur
}

export const MATIERES: MatiereInfo[] = [
  {
    nom: 'Bases de données',
    image: 'https://cdn-icons-png.flaticon.com/512/2906/2906274.png',
    prof: 'Prof. Jean Dupont',
    photoProf: 'https://i.pravatar.cc/80?img=11'
  },
  {
    nom: 'Technologies Web',
    image: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
    prof: 'Prof. Marie Curie',
    photoProf: 'https://i.pravatar.cc/80?img=47'
  },
  {
    nom: 'Développement Mobile',
    image: 'https://cdn-icons-png.flaticon.com/512/186/186240.png',
    prof: 'Prof. Ahmed Koné',
    photoProf: 'https://i.pravatar.cc/80?img=33'
  },
  {
    nom: 'Intelligence Artificielle',
    image: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
    prof: 'Prof. Sofia Diallo',
    photoProf: 'https://i.pravatar.cc/80?img=25'
  },
  {
    nom: 'Réseaux & Systèmes',
    image: 'https://cdn-icons-png.flaticon.com/512/1183/1183669.png',
    prof: 'Prof. Luc Bernard',
    photoProf: 'https://i.pravatar.cc/80?img=52'
  },
  {
    nom: 'Grails & Frameworks',
    image: 'https://cdn-icons-png.flaticon.com/512/919/919854.png',
    prof: 'Prof. Emma Traoré',
    photoProf: 'https://i.pravatar.cc/80?img=18'
  }
];

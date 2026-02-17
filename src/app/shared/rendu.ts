import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]',
})
export class Rendu {

  constructor(el:ElementRef) { 
    // on change la couleur de l'élément HTML en vert
    const n = el.nativeElement as HTMLElement;
    n.style.color = 'green';
    n.style.fontWeight = 'bold';
    //n.innerHTML += ' (rendu) !!!!!';
  }

}

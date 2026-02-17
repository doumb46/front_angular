import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNonRendu]',
})
export class NonRendu {

  constructor(el:ElementRef) { 
    // on change la couleur de l'élément HTML en vert
    const n = el.nativeElement as HTMLElement;
    n.style.color = 'red';
    n.style.fontWeight = 'bold';
    n.style.border = '2px dashed red';
    //n.innerHTML += ' (rendu) !!!!!';
  }

}

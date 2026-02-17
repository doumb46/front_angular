import { Directive } from '@angular/core';

@Directive({
  selector: '[appImportant]',
  host: {
    style: 'background-color: yellow; padding: 2px 4px; border-radius: 2px;'
  }
})
export class ImportantDirective {}

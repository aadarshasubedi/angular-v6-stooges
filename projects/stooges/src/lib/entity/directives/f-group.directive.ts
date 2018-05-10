import { FGroup } from '../edm-form.service';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[fGroup]'
})
export class FGroupDirective {

  constructor() { }

  @Input()
  fGroup: FGroup;

}

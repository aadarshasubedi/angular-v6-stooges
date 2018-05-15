import { Component, forwardRef, OnInit, Input } from '@angular/core';

import { AbstractAccessorComponent } from '../abstract-accessor';
import { InvalidFocus } from '../../forms/invalid-focus.interface';

@Component({
  selector: 's-mat-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss'],
  providers: [
    {
      provide: AbstractAccessorComponent,
      useExisting: forwardRef(() => CheckboxListComponent)
    },
    {
      provide: InvalidFocus,
      useExisting: forwardRef(() => CheckboxListComponent)
    }
  ]
})
export class CheckboxListComponent extends AbstractAccessorComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
  }

  @Input()
  compareWith: any
}


import { Component, forwardRef, OnInit, Input } from '@angular/core';

import { AbstractAccessorComponent } from '../abstract-accessor';
import { InvalidFocus } from '../../forms/invalid-focus.interface';

@Component({
  selector: 's-mat-radio-list',
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.scss'],
  providers: [
    {
      provide: AbstractAccessorComponent,
      useExisting: forwardRef(() => RadioListComponent)
    },
    {
      provide: InvalidFocus,
      useExisting: forwardRef(() => RadioListComponent)
    }
  ]
})
export class RadioListComponent extends AbstractAccessorComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
  }

  @Input()
  compareWith: any
}



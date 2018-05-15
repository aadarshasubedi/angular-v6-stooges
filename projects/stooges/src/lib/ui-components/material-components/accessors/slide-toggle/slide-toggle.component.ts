import { Component, forwardRef, OnInit } from '@angular/core';

import { AbstractAccessorComponent } from '../abstract-accessor';
import { InvalidFocus } from '../../forms/invalid-focus.interface';

@Component({
  selector: 's-mat-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  providers: [
    {
      provide: AbstractAccessorComponent,
      useExisting: forwardRef(() => SlideToggleComponent)
    },
    {
      provide: InvalidFocus,
      useExisting: forwardRef(() => SlideToggleComponent)
    }
  ]
})
export class SlideToggleComponent extends AbstractAccessorComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
  }

}

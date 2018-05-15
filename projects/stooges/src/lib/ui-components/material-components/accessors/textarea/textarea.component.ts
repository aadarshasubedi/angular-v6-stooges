import { Component, forwardRef, OnInit } from '@angular/core';

import { AbstractAccessorComponent } from '../abstract-accessor';
import { InvalidFocus } from '../../forms/invalid-focus.interface';

@Component({
  selector: 's-mat-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: AbstractAccessorComponent,
      useExisting: forwardRef(() => TextareaComponent)
    },
    {
      provide: InvalidFocus,
      useExisting: forwardRef(() => TextareaComponent)
    }
  ]
})
export class TextareaComponent extends AbstractAccessorComponent implements OnInit {


  ngOnInit() {
    super.ngOnInit();
  }

}

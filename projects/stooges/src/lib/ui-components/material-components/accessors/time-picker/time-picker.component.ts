import { Component, forwardRef, OnInit } from '@angular/core';

import { AbstractAccessorComponent } from '../abstract-accessor';
import { InvalidFocus } from '../../forms/invalid-focus.interface';



@Component({
  selector: 's-mat-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [
    {
      provide: AbstractAccessorComponent,
      useExisting: forwardRef(() => TimePickerComponent)
    },
    {
      provide: InvalidFocus,
      useExisting: forwardRef(() => TimePickerComponent)
    }
  ]
})
export class TimePickerComponent extends AbstractAccessorComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
  }


}


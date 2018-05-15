import { Component, forwardRef, OnInit } from '@angular/core';

import { AbstractAccessorComponent } from '../abstract-accessor';
import { InvalidFocus } from '../../forms/invalid-focus.interface';

@Component({
  selector: 's-mat-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss'],
  providers: [
    {
      provide: AbstractAccessorComponent,
      useExisting: forwardRef(() => CkeditorComponent)
    },
    {
      provide: InvalidFocus,
      useExisting: forwardRef(() => CkeditorComponent)
    }
  ]
})
export class CkeditorComponent extends AbstractAccessorComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
  }
}

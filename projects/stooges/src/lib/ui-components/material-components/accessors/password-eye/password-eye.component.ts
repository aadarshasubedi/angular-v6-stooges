import { InputComponent } from '../input/input.component';
import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';

import { AbstractAccessorComponent } from '../abstract-accessor';
import { InvalidFocus } from '../../forms/invalid-focus.interface';

@Component({
  selector: 's-mat-password-eye',
  templateUrl: './password-eye.component.html',
  styleUrls: ['./password-eye.component.scss'],
  providers: [
    {
      provide: AbstractAccessorComponent,
      useExisting: forwardRef(() => PasswordEyeComponent)
    },
    {
      provide: InvalidFocus,
      useExisting: forwardRef(() => PasswordEyeComponent)
    }
  ]
})
export class PasswordEyeComponent extends AbstractAccessorComponent implements OnInit {

  @Input()
  showPassword: boolean;

  ngOnInit() {
    super.ngOnInit();
  }

  focus() {
    this.inputComponent.focus();
  }

  @ViewChild(InputComponent, { read: InputComponent })
  inputComponent: InputComponent;
}


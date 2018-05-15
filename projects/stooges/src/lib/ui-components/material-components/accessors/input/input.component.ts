import { AfterViewInit, Component, forwardRef, Input, OnInit } from '@angular/core';

import { AbstractAccessorComponent } from '../abstract-accessor';
import { InvalidFocus } from '../../forms/invalid-focus.interface';

@Component({
  selector: 's-mat-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: AbstractAccessorComponent,
      useExisting: forwardRef(() => InputComponent)
    },
    {
      provide: InvalidFocus,
      useExisting: forwardRef(() => InputComponent)
    }
  ]
})
export class InputComponent extends AbstractAccessorComponent implements OnInit, AfterViewInit {

  // 也可以让外面控制哦
  @Input('type')
  inputType = 'text';

  @Input()
  autocomplete: string = null!;
 
  @Input()
  readonly: '' | boolean;

  @Input()
  autofocus: '' | undefined;

  get isReadonly() {
    return this.readonly === true || this.readonly === '';
  }

  public get value() {
    return this.formControl.value;
  }

  ngOnInit() {
    super.ngOnInit();
    this.inputType = (this.ui.accessorType) ? this.ui.accessorType.substring('input'.length).toLowerCase() : this.inputType;
  }

  ngAfterViewInit() {
    if (this.autofocus === '') this.focus();
  }
}

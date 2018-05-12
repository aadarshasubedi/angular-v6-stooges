import { ControlContainer, FormControl } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

/*
  <s-password-eye i18n-placeholder controlName="password" placeholder="Enter your password" [showPassword]="false" ></s-password-eye>
*/

@Component({
  selector: 's-password-eye',
  templateUrl: './password-eye.component.html',
  styleUrls: ['./password-eye.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordEyeComponent implements OnInit {

  constructor(
    private closestControl: ControlContainer,
  ) { }

  @Input()
  showPassword = true;

  @Input()
  controlName = '';

  @Input('control')
  formControl: FormControl;

  @Input()
  placeholder: string;

  get passwordType(): 'password' | 'text' {
    return this.showPassword ? 'text' : 'password';
  }

  ngOnInit() {
    this.formControl = this.formControl || this.closestControl.control!.get(this.controlName) as FormControl;
  }

}

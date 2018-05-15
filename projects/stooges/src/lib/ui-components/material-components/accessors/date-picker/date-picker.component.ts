import { DeviceService } from '../../common/services/device.service';
import { FGroupNameDirective } from '../../entity/directives/f-group-name.directive';
import { FGroupDirective } from '../../entity/directives/f-group.directive';
import { ControlContainer } from '@angular/forms';
import {
  Component,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Optional,
  ChangeDetectorRef
} from '@angular/core';
import { AbstractAccessorComponent } from '../abstract-accessor';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material';
import { InvalidFocus } from '../../forms/invalid-focus.interface';

@Component({
  selector: 's-mat-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: AbstractAccessorComponent,
      useExisting: forwardRef(() => DatePickerComponent)
    },
    {
      provide: InvalidFocus,
      useExisting: forwardRef(() => DatePickerComponent)
    }
  ]
})
export class DatePickerComponent extends AbstractAccessorComponent implements OnInit {

  constructor(
    cdr: ChangeDetectorRef,
    private deviceService: DeviceService,
    @Inject(MAT_DATE_FORMATS) private inputDateDisplayFormat: MatDateFormats,
    @Optional() closestControl?: ControlContainer,
    @Optional() fGroupDirective?: FGroupDirective,
    @Optional() fGroupNameDirective?: FGroupNameDirective
  ) {
    super(cdr, closestControl, fGroupDirective, fGroupNameDirective);
  }

  mobile = false;

  @Input()
  min: Date;

  @Input()
  max: Date;

  @Input()
  filter: (d: Date) => boolean;

  ngOnInit() {
    super.ngOnInit();
    this.inputDateDisplayFormat.display.dateInput['month'] = 'short';
    this.mobile = this.deviceService.device == 'mobile';
  }


}


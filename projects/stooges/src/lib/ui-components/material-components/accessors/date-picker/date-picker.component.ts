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
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material';
import { DeviceService } from '../../../../common/services/device.service';
import { AbstractAccessorComponent } from '../../../../form/components/abstract-accessor';
import { InvalidFocus } from '../../../../form/types';
import { EGroupDirective } from '../../../../entity/directives/e-group.directive';
import { EGroupNameDirective } from '../../../../entity/directives/e-group-name.directive';

@Component({
  selector: 's-mat-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: AbstractAccessorComponent,
      useExisting: forwardRef(() => MatDatePickerComponent)
    },
    {
      provide: InvalidFocus,
      useExisting: forwardRef(() => MatDatePickerComponent)
    }
  ]
})
export class MatDatePickerComponent extends AbstractAccessorComponent implements OnInit {

  constructor(
    cdr: ChangeDetectorRef,
    private deviceService: DeviceService,
    @Inject(MAT_DATE_FORMATS) private inputDateDisplayFormat: MatDateFormats,
    @Optional() closestControl?: ControlContainer,
    @Optional() eGroupDirective?: EGroupDirective,
    @Optional() eGroupNameDirective?: EGroupNameDirective
  ) {
    super(cdr, closestControl, eGroupDirective, eGroupNameDirective);
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


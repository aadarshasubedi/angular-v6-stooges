import { NgModule } from '@angular/core';
import { RadioListComponent } from './radio-list.component';
import { BaseRadioListComponent } from './base-radio-list/base-radio-list.component';
import { CommonModule } from '../../common/common.module';
import { FormsModule } from '../../forms/forms.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [RadioListComponent, BaseRadioListComponent],
  declarations: [RadioListComponent, BaseRadioListComponent]
})
export class RadioListModule { }

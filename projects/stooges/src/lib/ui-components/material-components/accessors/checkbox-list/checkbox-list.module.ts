import { NgModule } from '@angular/core';
import { CheckboxListComponent } from './checkbox-list.component';
import { CommonModule } from '../../common/common.module';
import { BaseCheckboxListComponent } from './base-checkbox-list/base-checkbox-list.component';
import { FormsModule } from '../../forms/forms.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [
    CheckboxListComponent,
    BaseCheckboxListComponent
  ],
  declarations: [CheckboxListComponent, BaseCheckboxListComponent]
})
export class CheckboxListModule { }

import { TextareaModule } from './textarea/textarea.module';
import { NgModule } from '@angular/core';

import { CheckboxModule } from './checkbox/checkbox.module';
import { CkeditorModule } from './ckeditor/ckeditor.module';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { InputModule } from './input/input.module';
import { PasswordEyeModule } from './password-eye/password-eye.module';
import { SimpleSelectModule } from './simple-select/simple-select.module';
import { SlideToggleModule } from './slide-toggle/slide-toggle.module';
import { TimePickerModule } from './time-picker/time-picker.module';
import { UploadModule } from './upload/upload.module';
import { CheckboxListModule } from './checkbox-list/checkbox-list.module';
import { RadioListModule } from './radio-list/radio-list.module';
import { TableModule } from './table/table.module';
import { DynamicAccessorModule } from './dynamic-accessor/dynamic-accessor.module';

@NgModule({
  imports: [],
  exports: [
    CheckboxModule,
    UploadModule,
    ConfirmDialogModule,
    CkeditorModule,
    DatePickerModule,
    InputModule,
    PasswordEyeModule,
    SimpleSelectModule,
    SlideToggleModule,
    TextareaModule,
    TimePickerModule,
    CheckboxListModule,
    RadioListModule,
    TableModule,
    DynamicAccessorModule
  ],
  declarations: []
})
export class MaterialModule { }

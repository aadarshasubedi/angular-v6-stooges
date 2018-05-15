import { SimpleSelectModule } from './../simple-select/simple-select.module';
import { DynamicAccessorComponent } from "./dynamic-accessor.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckboxModule } from "../checkbox/checkbox.module";
import { UploadModule } from "../upload/upload.module";
import { CkeditorModule } from "../ckeditor/ckeditor.module";
import { DatePickerModule } from "../date-picker/date-picker.module";
import { InputModule } from "../input/input.module";
import { SlideToggleModule } from '../slide-toggle/slide-toggle.module';
import { TextareaModule } from '../textarea/textarea.module';
import { TimePickerModule } from '../time-picker/time-picker.module';
import { FormsModule } from '../../forms/forms.module';
import { UrlTitleModule } from '../../wujiakegui/url-title/url-title.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CheckboxModule,
    UploadModule,
    CkeditorModule,
    DatePickerModule,
    InputModule,
    SimpleSelectModule,
    SlideToggleModule,
    TextareaModule,
    TimePickerModule,
    UrlTitleModule
  ],
  exports: [
    DynamicAccessorComponent
  ],
  declarations: [DynamicAccessorComponent]
})
export class DynamicAccessorModule { }

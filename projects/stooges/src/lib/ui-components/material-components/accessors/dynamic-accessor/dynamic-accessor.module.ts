import { MatSimpleSelectModule } from './../simple-select/simple-select.module';
import { MatDynamicAccessorComponent } from "./dynamic-accessor.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "../checkbox/checkbox.module";
import { UploadModule } from "../upload/upload.module";
import { MatCkeditorModule } from "../ckeditor/ckeditor.module";
import { MatDatePickerModule } from "../date-picker/date-picker.module";
import { MatInputModule } from "../input/input.module";
import { MatSlideToggleModule } from '../slide-toggle/slide-toggle.module';
import { TextareaModule } from '../textarea/textarea.module';
import { TimePickerModule } from '../time-picker/time-picker.module';
import { FormModule } from '../../../../form/form.module';
import { UrlTitleModule } from '../../../../wujiakegui/url-title/url-title.module';


@NgModule({
  imports: [
    CommonModule,
    FormModule,
    MatCheckboxModule,
    UploadModule,
    MatCkeditorModule,
    MatDatePickerModule,
    MatInputModule,
    MatSimpleSelectModule,
    MatSlideToggleModule,
    TextareaModule,
    TimePickerModule,
    UrlTitleModule
  ],
  exports: [
    MatDynamicAccessorComponent
  ],
  declarations: [MatDynamicAccessorComponent]
})
export class MatDynamicAccessorModule { }

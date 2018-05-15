import { NgModule } from '@angular/core';

import { CommonModule } from '../../common/common.module';
import { FormsModule } from '../../forms/forms.module';
import { LanguageModule } from '../../language/language.module';
import { DatePickerComponent } from './date-picker.component';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LanguageModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [DatePickerComponent],
    declarations: [DatePickerComponent],
    providers: [],
})
export class DatePickerModule { }

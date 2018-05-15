import { NgModule } from '@angular/core';

import { CommonModule } from '../../common/common.module';
import { FormsModule } from '../../forms/forms.module';
import { LanguageModule } from '../../language/language.module';
import { TimePickerModule as StoogesTimePickerModule } from '../../ui-components/accessors/time-picker/time-picker.module';
import { TimePickerComponent } from './time-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LanguageModule,
        StoogesTimePickerModule
    ],
    exports: [TimePickerComponent],
    declarations: [TimePickerComponent],
    providers: []
})
export class TimePickerModule { }

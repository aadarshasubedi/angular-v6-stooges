import { NgModule } from '@angular/core';

import { CommonModule } from '../../common/common.module';
import { FormsModule } from '../../forms/forms.module';
import { LanguageModule } from '../../language/language.module';
import { CkeditorModule as StoogesCkeditorModule } from '../../ui-components/accessors/ckeditor/ckeditor.module';
import { CkeditorComponent } from './ckeditor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LanguageModule,
        StoogesCkeditorModule
    ],
    exports: [CkeditorComponent],
    declarations: [CkeditorComponent],
    providers: [],
})
export class CkeditorModule { }

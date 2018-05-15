import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';

import { CommonModule } from '../../common/common.module';
import { FormsModule } from '../../forms/forms.module';
import { LanguageModule } from '../../language/language.module';
import { SimpleSelectComponent } from './simple-select.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LanguageModule,
        MatSelectModule,
        MatFormFieldModule
    ],
    exports: [SimpleSelectComponent],
    declarations: [SimpleSelectComponent],
    providers: []
})
export class SimpleSelectModule { }

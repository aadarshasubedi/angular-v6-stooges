import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { CommonModule } from '../../common/common.module';
import { FormsModule } from '../../forms/forms.module';
import { LanguageModule } from '../../language/language.module';
import { TextareaComponent } from './textarea.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LanguageModule,
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [TextareaComponent],
    declarations: [TextareaComponent],
    providers: []
})
export class TextareaModule { }

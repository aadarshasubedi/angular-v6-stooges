import { NgModule } from '@angular/core';
import { MatInputModule, MatFormFieldModule } from '@angular/material';

import { CommonModule } from '../../common/common.module';
import { FormsModule } from '../../forms/forms.module';
import { LanguageModule } from '../../language/language.module';
import { InputComponent } from './input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LanguageModule,
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [InputComponent],
    declarations: [InputComponent],
    providers: []
})
export class InputModule { }

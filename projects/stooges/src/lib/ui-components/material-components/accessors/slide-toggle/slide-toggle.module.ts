import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material';

import { CommonModule } from '../../common/common.module';
import { FormsModule } from '../../forms/forms.module';
import { LanguageModule } from '../../language/language.module';
import { SlideToggleComponent } from './slide-toggle.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LanguageModule,
        MatSlideToggleModule
    ],
    exports: [SlideToggleComponent],
    declarations: [SlideToggleComponent],
    providers: []
})
export class SlideToggleModule { }

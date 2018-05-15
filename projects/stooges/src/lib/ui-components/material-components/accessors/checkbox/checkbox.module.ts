import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material';

import { MatCheckboxComponent } from './checkbox.component';
import { FormModule } from '../../../../form/form.module';


@NgModule({
    imports: [
        FormModule,
        MatCheckboxModule
    ],
    exports: [MatCheckboxComponent],
    declarations: [MatCheckboxComponent],
    providers: [],
})
export class CheckboxModule { }

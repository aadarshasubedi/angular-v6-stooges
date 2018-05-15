import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';

import { CommonModule } from '../../common/common.module';
import { InputModule } from '../input/input.module';
import { PasswordEyeComponent } from './password-eye.component';

@NgModule({
    imports: [
        CommonModule,
        InputModule,
        MatIconModule
    ],
    exports: [PasswordEyeComponent],
    declarations: [PasswordEyeComponent],
    providers: []
})
export class PasswordEyeModule { }

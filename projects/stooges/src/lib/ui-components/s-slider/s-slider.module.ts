import { NgModule } from '@angular/core';
import { CommonModule } from '../../../modules/common/common.module';
import { SSliderComponent } from './s-slider.component';
import {ObserversModule} from '@angular/cdk/observers';

@NgModule({
    imports: [
        CommonModule,
        ObserversModule
    ],
    exports: [
        SSliderComponent
    ],
    declarations: [
        SSliderComponent
    ]
})
export class SSliderModule { }

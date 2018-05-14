import { NgModule } from '@angular/core';
import { SZoomComponent } from './s-zoom.component';
import { CommonModule } from '../../../modules/common/common.module';

@NgModule({
  imports: [
     CommonModule
  ],
  exports : [
    SZoomComponent
  ],
  declarations: [SZoomComponent]
})
export class SZoomModule { }

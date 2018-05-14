import { NgModule } from '@angular/core';
import { SLightboxComponent } from './s-lightbox.component';
import { CommonModule } from '../../../modules/common/common.module';
import { SSliderModule } from '../../../modules/ui-components/s-slider/s-slider.module';
import { OverlayModule } from '../../../modules/ui-components/overlay/overlay.module';
import { OverlayModule as NgOverlayModule } from '@angular/cdk/overlay';
import { SZoomModule } from '../../../modules/ui-components/s-zoom/s-zoom.module';
import { SLightboxDeepStyleComponent } from './s-lightbox-deep-style/s-lightbox-deep-style.component';

@NgModule({
  imports: [
    CommonModule,
    SSliderModule,
    OverlayModule,
    NgOverlayModule,
    SZoomModule
  ],
  exports: [SLightboxComponent],
  declarations: [SLightboxComponent, SLightboxDeepStyleComponent]
})
export class SLightboxModule { }

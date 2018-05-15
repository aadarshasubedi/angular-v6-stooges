import { LanguageModule } from '../../language/language.module';
import { FormsModule } from '../../forms/forms.module';
import { CommonModule } from '../../common/common.module';
import { NgModule } from '@angular/core';

import { UploadComponent } from './upload.component';
import { UploadFailedAlertComponent } from './upload-failed-alert/upload-failed-alert.component';
import { UploadRequirementComponent } from './upload-requirement/upload-requirement.component';
import { UploadModule as BaseUploadModule } from '../../ui-components/accessors/upload/upload.module';
import { MatIconModule, MatDialogModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { SZoomModule } from '../../ui-components/s-zoom/s-zoom.module';
import { OverlayModule } from '../../ui-components/overlay/overlay.module';
import { OverlayModule as NgOverlayModule } from '@angular/cdk/overlay';
import { CanvasForCropComponent } from './canvas-for-crop/canvas-for-crop.component';

@NgModule({
    imports: [
        BaseUploadModule,
        CommonModule,
        FormsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatDialogModule,
        LanguageModule,
        SZoomModule,
        OverlayModule,
        NgOverlayModule
    ],
    exports: [UploadComponent],
    declarations: [UploadComponent, UploadFailedAlertComponent, UploadRequirementComponent, CanvasForCropComponent],
    providers: [],
    entryComponents: [UploadFailedAlertComponent]
})
export class UploadModule { }

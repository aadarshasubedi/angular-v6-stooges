import { NgModule } from '@angular/core';

import { MatUploadComponent } from './upload.component';
import { UploadFailedAlertComponent } from './upload-failed-alert/upload-failed-alert.component';
import { UploadRequirementComponent } from './upload-requirement/upload-requirement.component';
import { MatIconModule, MatDialogModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { OverlayModule as NgOverlayModule } from '@angular/cdk/overlay';
import { CanvasForCropComponent } from './canvas-for-crop/canvas-for-crop.component';
import { ZoomModule } from '../../../zoom/zoom.module';
import { OverlayModule } from '../../../overlay/overlay.module';
import { CommonModule } from '../../../../common/common.module';
import { FormModule } from '../../../../form/form.module';
import { UploadModule } from '../../../accessors/upload/upload.module';

@NgModule({
    imports: [
        UploadModule,
        CommonModule,
        FormModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatDialogModule,
        ZoomModule,
        OverlayModule,
        NgOverlayModule
    ],
    exports: [MatUploadComponent],
    declarations: [MatUploadComponent, UploadFailedAlertComponent, UploadRequirementComponent, CanvasForCropComponent],
    providers: [],
    entryComponents: [UploadFailedAlertComponent]
})
export class MatUploadModule { }

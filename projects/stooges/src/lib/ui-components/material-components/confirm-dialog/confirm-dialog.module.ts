import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule, MatFormFieldModule } from '@angular/material';
import { FormModule } from '../../../form/form.module';
import { CommonModule } from '../../../common/common.module';

@NgModule({
  imports: [
    MatDialogModule,
    FormModule,
    CommonModule,
    MatFormFieldModule
  ],
  declarations: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class ConfirmDialogModule { }

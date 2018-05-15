import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { ImageData } from '../../../common/services/image.service';
import { FileMetadata } from '../../../entity/decorators';

@Component({
  selector: 's-upload-failed-alert',
  templateUrl: './upload-failed-alert.component.html',
  styleUrls: ['./upload-failed-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFailedAlertComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  fileMetadata: FileMetadata;

  imageData: ImageData;

  ngOnInit() {
    this.fileMetadata = this.data.fileMetadata;
    this.imageData = this.data.imageData;
  }

}

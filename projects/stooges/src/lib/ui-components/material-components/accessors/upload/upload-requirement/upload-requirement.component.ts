import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ImageData } from '../../../common/services/image.service';
import { FileMetadata } from '../../../entity/decorators';

@Component({
  selector: 's-upload-requirement',
  templateUrl: './upload-requirement.component.html',
  styleUrls: ['./upload-requirement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadRequirementComponent implements OnInit {

  constructor() { }

  @Input()
  fileMetadata: FileMetadata

  @Input()
  imageData: ImageData;

  ngOnInit() {

  }

}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SImageData } from '../../../../../common/services';
import { FileMetadata } from '../../../../../decorators/FileDecorator';

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
  imageData: SImageData;

  ngOnInit() {

  }

}

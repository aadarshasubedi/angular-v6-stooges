import { DeviceService } from './../../common/services/device.service';
import { FileData } from './../../ui-components/accessors/upload/FileData';
import { Component, forwardRef, OnInit, Optional, ViewChild, ViewContainerRef, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ImageData, ImageService } from '../../common/services/image.service';
import { FGroupNameDirective } from '../../entity/directives/f-group-name.directive';
import { FGroupDirective } from '../../entity/directives/f-group.directive';
import { UploadComponent as BaseUploadComponent } from '../../ui-components/accessors/upload/upload.component';
import { AbstractAccessorComponent } from '../abstract-accessor';
import { UploadFailedAlertComponent } from './upload-failed-alert/upload-failed-alert.component';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { fadeInAnimation } from '../../animations/fade-in.animation';
import { OverlayFrameComponent } from '../../ui-components/overlay/overlay-frame/overlay-frame.component';
import { TemplatePortal } from '@angular/cdk/portal';
import { ZoomData } from '../../ui-components/s-zoom/s-zoom.component';
import { CropData } from '../../../stooges/types';
import { InvalidFocus } from '../../forms/invalid-focus.interface';
import { FileMetadata, ImageMetadata, METADATA_KEY } from '../../entity/decorators';

export interface CropingFileData {
  fileData: FileData;
  frameWidth: number;
  frameHeight: number;
  transformFrameWidth: number;
  transformFrameHeight: number;
  scale: number;
}

@Component({
  selector: 's-mat-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [
    {
      provide: AbstractAccessorComponent,
      useExisting: forwardRef(() => UploadComponent)
    },
    {
      provide: InvalidFocus,
      useExisting: forwardRef(() => UploadComponent)
    }
  ],
  animations: [fadeInAnimation]
})
export class UploadComponent extends AbstractAccessorComponent implements OnInit {

  checkPending() {
    return this.baseUploadComponent.pending;
  }

  getPendingEmitter() {
    return this.baseUploadComponent.uploadDoneEmitter;
  }

  @ViewChild('upload', { read: BaseUploadComponent })
  private upload: BaseUploadComponent;

  focus() {
    this.upload.focus();
  }

  constructor(
    cdr: ChangeDetectorRef,
    private imageService: ImageService,
    private dialog: MatDialog,
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private deviceService: DeviceService,
    @Optional() closestControl: ControlContainer,
    @Optional() fGroupDirective?: FGroupDirective,
    @Optional() fGroupNameDirective?: FGroupNameDirective
  ) {
    super(cdr, closestControl, fGroupDirective, fGroupNameDirective);
  }


  isImageUpload: boolean;
  imageData: ImageData;
  fileMetadata: FileMetadata | ImageMetadata;
  imageMetadata: ImageMetadata; // 方便 html 调用

  @ViewChild(BaseUploadComponent, { read: BaseUploadComponent })
  baseUploadComponent: BaseUploadComponent;

  validationFailed() {
    this.dialog.open(UploadFailedAlertComponent, {
      width: '100%',
      maxWidth: '500px',
      data: {
        fileMetadata: this.fileMetadata,
        imageData: this.imageData
      }
    });
  }

  @ViewChild('popup', { read: TemplateRef })
  private popupTemplate: TemplateRef<any>;


  @ViewChild('overlayFrame', { read: OverlayFrameComponent })
  overlayFrame: OverlayFrameComponent;

  disposeOverlayRef() {
    this.overlayRef!.dispose();
    this.overlayRef = null;
  }

  private overlayRef: OverlayRef | null;

  cropingFileDatas: CropingFileData[];
  cropfile(fileDatas: FileData[]) {
    this.cropingFileDatas = fileDatas.map<CropingFileData>(fileData => {

      const deviceWidth = this.deviceService.deviceWidth - 40;
      const deviceHeight = this.deviceService.deviceHeight - 100;

      let expectedFrameWidth = this.imageData.maxWidthAfterCeilAndAspectRatio / this.deviceService.devicePixelRatio;
      let expectedFrameHeight = this.imageData.maxHeightAfterCeilAndAspectRatio / this.deviceService.devicePixelRatio;

      const final = (expectedFrameWidth > deviceWidth || expectedFrameHeight > deviceHeight) ?
        this.imageService.imageToFrame(expectedFrameWidth, expectedFrameHeight, deviceWidth, deviceHeight, 'contain') :
        { width: expectedFrameWidth, height: expectedFrameHeight };

      const scale = final.width / expectedFrameWidth; // 因为 viewport width 小于 我们期望的 frameWidth 所以压缩, crop 的时候要算回来的
      return {
        fileData,
        frameWidth: final.width,
        frameHeight: final.height,
        scale,
        transformFrameWidth: fileData.imageFile!.width / this.deviceService.devicePixelRatio * scale,
        transformFrameHeight: fileData.imageFile!.height / this.deviceService.devicePixelRatio * scale,
      };
    });

    if (this.overlayRef) this.disposeOverlayRef(); // 确保只有一个 overlay
    this.overlayRef = this.overlay.create(new OverlayConfig({
      positionStrategy: this.overlay.position()
        .global()
        .width(this.cropingFileDatas[0].frameWidth + 'px')
        .height(this.cropingFileDatas[0].frameHeight + 'px')
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true,
    }));

    const portal = new TemplatePortal(this.popupTemplate, this.vcr);
    this.overlayRef.attach(portal);
  }

  crop(cropingFileData: CropingFileData, zoomData: ZoomData) {
    const crop: CropData = {
      x: Math.ceil(Math.abs(zoomData.x / zoomData.scale) * this.deviceService.devicePixelRatio / cropingFileData.scale),
      y: Math.ceil(Math.abs(zoomData.y / zoomData.scale) * this.deviceService.devicePixelRatio / cropingFileData.scale),
      width: Math.ceil(cropingFileData.frameWidth / zoomData.scale * this.deviceService.devicePixelRatio / cropingFileData.scale),
      height: Math.ceil(cropingFileData.frameHeight / zoomData.scale * this.deviceService.devicePixelRatio / cropingFileData.scale)
    };
    this.baseUploadComponent.uploadToServer(cropingFileData.fileData, crop);
    this.cropingFileDatas.splice(0, 1);
    if (this.cropingFileDatas.length == 0) {
      this.overlayRef!.detachBackdrop();
      this.overlayFrame.animationLeave();
    }
    else {
      const next = this.cropingFileDatas[0];
      this.overlayRef!.updateSize({
        width: next.frameWidth,
        height: next.frameHeight
      });
    }
  }


  ngOnInit() {
    super.ngOnInit();
    this.fileMetadata = this.fControl.getMetadata(METADATA_KEY.File) || this.fControl.getMetadata(METADATA_KEY.Image);
    if (this.fileMetadata instanceof ImageMetadata) {
      this.imageMetadata = this.fileMetadata;
      this.isImageUpload = true;
      this.imageData = this.imageService.getData(this.fileMetadata);
    }
  }
}

import { UploadFileData } from './../../../../ui-components/accessors/upload/UploadFileData';

export interface MatCropingFileData {
    fileData: UploadFileData;
    frameWidth: number;
    frameHeight: number;
    transformFrameWidth: number;
    transformFrameHeight: number;
    scale: number;
  }
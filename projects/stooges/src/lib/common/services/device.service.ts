import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Device } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private document: Document
  constructor(
    // 必须是 any, 然后才放进去, 不然 compile 会 error 
    // https://github.com/angular/angular/issues/20351
    // 目前这个是 material 的解决方案.
    @Inject(DOCUMENT) _document: any 
  ) {
    this.document = _document;
  }

  get device(): Device {
    if (this.deviceWidth <= 420) {
      return 'mobile';
    }
    else if (this.deviceWidth <= 1024) {
      return 'tablet';
    }
    else {
      return 'pc';
    }
  }

  get devicePixelRatio(): number {
    return window.devicePixelRatio;
  }

  get deviceWidth(): number {
    return this.document.documentElement.clientWidth;
  }
  get deviceHeight(): number {
    return this.document.documentElement.clientHeight;
  }


}

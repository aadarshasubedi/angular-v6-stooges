import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// sample
//<div [style.transform]="imgTransfromStyle | sSafeStyle"></div>
@Pipe({ name: 'sSafeStyle' })
export class SafeStylePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(style: any) {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}

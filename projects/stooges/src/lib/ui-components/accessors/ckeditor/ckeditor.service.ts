
import { Injectable } from '@angular/core';
import { createAndAppendScriptAsync } from '../../../common/methods/create-and-append-script';

@Injectable({
  providedIn: 'root'
})
export class CkeditorService {

  constructor(
  ) { }

  private loadScriptPromise: Promise<void>;

  async loadScriptAsync() {
    if (this.loadScriptPromise) return this.loadScriptPromise;
    this.loadScriptPromise = createAndAppendScriptAsync('/assets/js/ckeditor/ckeditor-4.7.2.js');
    return this.loadScriptPromise;
  }
}

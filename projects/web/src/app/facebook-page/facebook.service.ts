import { Injectable } from '@angular/core';

declare let FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor() { }

  private loadScriptPromise: Promise<boolean>;
  private donePromise = new Promise<boolean>((resolve) => {
    resolve(false);
  });
  private scriptDone = false;

  async loadScriptAsync(): Promise<boolean> {
    if (this.scriptDone) return this.donePromise;
    if (this.loadScriptPromise) return this.loadScriptPromise;
    this.loadScriptPromise = new Promise<boolean>((resolve) => {
      window['fbAsyncInit'] = () => {
        FB.init({
          appId: '247179212471500',
          cookie: true,
          xfbml: true,
          version: 'v2.10'
        });
        this.scriptDone = true;
        resolve(true);
      };
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = '//connect.facebook.net/en_US/sdk.js';
      script.id = 'facebook-jssdk';
      document.getElementsByTagName('head')[0].appendChild(script);
    });
    return this.loadScriptPromise;
  }
}

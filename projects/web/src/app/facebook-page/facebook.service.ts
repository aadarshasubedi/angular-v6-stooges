import { Injectable } from '@angular/core';

declare let FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor() { }

  private loadScriptPromise: Promise<boolean>;
  async loadScriptAsync(): Promise<boolean> {
    if (this.loadScriptPromise) return this.loadScriptPromise;
    this.loadScriptPromise = new Promise<boolean>((resolve) => {
      window['fbAsyncInit'] = () => {
        FB.init({
          appId: '1695485187203209',
          cookie: true,
          xfbml: true,
          version: 'v3.0'
        });
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

import { FacebookConfig, FACEBOOK_CONFIG } from './facebook-config';
import { Inject, Injectable } from '@angular/core';

declare let FB: any;

@Injectable({
  providedIn : 'root'
})
export class FacebookService {

  constructor(
    @Inject(FACEBOOK_CONFIG) private config: FacebookConfig
  ) { }


  private loadScriptPromise: Promise<boolean>;
  private donePromise = new Promise<boolean>((resolve) => {
    resolve(false);
  });
  private scriptDone = false;

  async loadScriptAsync() : Promise<boolean> {
    if (this.scriptDone) return this.donePromise;
    if (this.loadScriptPromise) return this.loadScriptPromise;
    this.loadScriptPromise = new Promise<boolean>((resolve) => {
      window['fbAsyncInit'] = () => {
        FB.init({
          appId: this.config.appId,
          cookie: true,
          xfbml: true,
          version: this.config.version
        });
        this.scriptDone = true;
        resolve(true);
      };
      const d = document;
      const s = 'script';
      const id = 'facebook-jssdk';
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js'; //如果用了 FB.init 这里请求的 script 就不要放 #appId=123 之类的, 不然会有 Bug
      fjs.parentNode!.insertBefore(js, fjs);
    });
    return this.loadScriptPromise;
  }

  /**
   * @description Error<string> 'cancel' | 'notAllowEmail' | 'noEmail'
   */
  async loginAsync(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      FB.login((responseLogin: any) => {
        //response = {
        //    authResponse: {
        //        accessToken: '',
        //        expiresIn: 4875,
        //        grantedScopes: 'email,public_profile',
        //        userID : 'zz'
        //    },
        //    status: 'connected'
        //}
        if (responseLogin.authResponse) {
          if ((responseLogin.authResponse.grantedScopes as string).indexOf('email') == -1) reject('notAllowEmail');
          FB.api('/me', { fields: 'id, name, email' }, (responseMe: any) => {
            // response = {
            //   id: 'zz',
            //   name: '',
            //   email: '' // if no then don't have this property
            // }
            if (!responseMe.email) reject('noEmail');
            resolve(responseLogin.authResponse.accessToken);
          });
        }
        else {
          reject('cancel');
        }
      }, {
          scope: 'email',
          return_scopes: true,
          auth_type: 'rerequest' //每一次都要求过
        });
    });

  }


}

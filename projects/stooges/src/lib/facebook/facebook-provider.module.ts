import { ModuleWithProviders, NgModule } from '@angular/core';

import { FacebookConfig, facebookConfigToken } from './Config';
import { FacebookService } from './facebook.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: []
})
export class FacebookProviderModule {
  static forRoot(config: Partial<FacebookConfig>): ModuleWithProviders {
    return {
      ngModule: FacebookProviderModule,
      providers: [
        { provide: facebookConfigToken, useValue: config },
        FacebookService
      ]
    };
  }
}

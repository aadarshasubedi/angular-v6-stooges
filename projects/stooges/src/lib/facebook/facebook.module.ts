import { NgModule } from '@angular/core';

import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { FacebookPageComponent } from './facebook-page/facebook-page.component';

@NgModule({
  imports: [],
  exports: [FacebookPageComponent, FacebookLoginComponent],
  declarations: [FacebookPageComponent, FacebookLoginComponent]
})
export class FacebookModule {}

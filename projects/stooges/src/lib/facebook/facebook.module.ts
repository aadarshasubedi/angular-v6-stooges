import { NgModule } from '@angular/core';

import { CommonModule } from '../common/common.module';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { FacebookPageComponent } from './facebook-page/facebook-page.component';

@NgModule({
  imports: [CommonModule],
  exports: [FacebookPageComponent, FacebookLoginComponent],
  declarations: [FacebookPageComponent, FacebookLoginComponent]
})
export class FacebookModule {

}

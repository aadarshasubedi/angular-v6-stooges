import { NgModule } from '@angular/core';
import { StoogesAppComponent } from './stooges-app.component';
import { YoutubeLoadingComponent } from './youtube-loading/youtube-loading.component';

@NgModule({
  imports: [],
  exports: [StoogesAppComponent],
  declarations: [
    StoogesAppComponent,
    YoutubeLoadingComponent
  ]
})
export class StoogesAppModule { }

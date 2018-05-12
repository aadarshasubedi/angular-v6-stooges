import 'reflect-metadata';

import { NgModule } from '@angular/core';
import { StoogesAppComponent } from './stooges-app.component';
import { YoutubeLoadingComponent } from './youtube-loading/youtube-loading.component';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { StoogesHammerGestureConfig } from './hammer-config';
import { HttpModule } from '../http/http.module';

@NgModule({
  imports: [
    HttpModule
  ],
  exports: [StoogesAppComponent],
  declarations: [
    StoogesAppComponent,
    YoutubeLoadingComponent
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: StoogesHammerGestureConfig
    },
  ]
})
export class StoogesAppModule { }

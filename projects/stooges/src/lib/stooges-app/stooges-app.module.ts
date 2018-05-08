import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoogesAppComponent } from './stooges-app.component';
import { YoutubeLoadingComponent } from './youtube-loading/youtube-loading.component';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { StoogesHammerGestureConfig } from './hammer-config';
import { StoogesAppSetupData } from './StoogesAppSetupData';
import { TITLE_META_DESCRIPTION_CONFIG, TitleMetaDescriptionConfig } from '../title-meta-description-config';

@NgModule({
  imports: [],
  exports: [StoogesAppComponent],
  declarations: [
    StoogesAppComponent,
    YoutubeLoadingComponent
  ]
})
export class StoogesAppModule {

  // for easy setup all the thing
  static forRoot(data: StoogesAppSetupData): ModuleWithProviders {
    return {
      ngModule: StoogesAppModule,
      providers: [
        {
          provide: HAMMER_GESTURE_CONFIG,
          useClass: StoogesHammerGestureConfig
        },
        {
          provide: TITLE_META_DESCRIPTION_CONFIG, useValue: new TitleMetaDescriptionConfig({
            titleSuffix: data.titleSuffix
          })
        }
      ]
    };
  }
}

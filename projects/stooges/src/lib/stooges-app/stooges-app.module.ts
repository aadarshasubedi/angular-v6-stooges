import 'reflect-metadata';

import { UPLOADED_PATH_CONFIG, UploadedPathConfig } from '../common/services/uploaded-path-config';
import { TITLE_META_DESCRIPTION_CONFIG, TitleMetaDescriptionConfig } from '../common/services/title-meta-description-config';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoogesAppComponent } from './stooges-app.component';
import { YoutubeLoadingComponent } from './youtube-loading/youtube-loading.component';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { StoogesHammerGestureConfig } from './hammer-config';
import { StoogesAppSetupData } from './StoogesAppSetupData';
import { API_SERVER_CONFIG, APIServerConfig } from '../common/services/api-server-config';
import { HttpModule } from '../http/http.module';
import { LanguageConfig, LANGUAGE_CONFIG } from '../language/language-config';
 
@NgModule({
  imports: [
    HttpModule
  ],
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
          provide: TITLE_META_DESCRIPTION_CONFIG, useValue: data.titleMetaDescriptionConfig
        },
        {
          provide: UPLOADED_PATH_CONFIG, useValue: data.uploadedPathConfig
        },
        {
          provide: API_SERVER_CONFIG, useValue: data.APIServerConfig
        },
        {
          provide: LANGUAGE_CONFIG, useValue: data.languageConfig
        }
      ]
    };
  }
}

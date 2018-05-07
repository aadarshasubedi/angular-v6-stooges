import { YoutubeLoadingService } from './youtube-loading.service';
import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports : [],
  declarations: []
})
export class YoutubeLoadingProviderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: YoutubeLoadingProviderModule,
      providers: [
        YoutubeLoadingService
      ]
    };
  }
}




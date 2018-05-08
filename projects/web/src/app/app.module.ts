import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoogesAppModule, TITLE_META_DESCRIPTION_CONFIG, TitleMetaDescriptionConfig } from '@stooges';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoogesAppModule
  ],
  providers: [
    {
      provide: TITLE_META_DESCRIPTION_CONFIG, useValue: new TitleMetaDescriptionConfig({
        titleSuffix: 'Stooges'
      })
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

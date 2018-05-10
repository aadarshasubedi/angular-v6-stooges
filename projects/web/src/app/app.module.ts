import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoogesAppModule } from '@stooges';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoogesAppModule.forRoot({
      titleSuffix: 'Stooges',
      uploadedFilesPath: environment.uploadedFilesPath,
      APIServer : environment.APIServer
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoogesAppModule } from '@stooges';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoogesAppModule.forRoot({
      titleSuffix : 'Stooges'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

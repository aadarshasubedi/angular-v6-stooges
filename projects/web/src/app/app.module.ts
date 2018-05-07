import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoogesModule } from 'stooges'; 
import { testing } from 'stooges/testing';
console.log(testing);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoogesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

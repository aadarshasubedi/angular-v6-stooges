import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
// import { CommonModule } from '@stooges';
import { FacebookPageModule } from '../facebook-page/facebook-page.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FacebookPageModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }

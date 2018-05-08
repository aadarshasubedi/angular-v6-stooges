import { RouteData } from '@stooges';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: HomeComponent,
      data: new RouteData({
        title: 'Home',
        metaDescription: 'Home description',
        robotsRule: { self: 'noindex, nofollow', children: 'noindex, nofollow' }
      })
    }
  ])],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

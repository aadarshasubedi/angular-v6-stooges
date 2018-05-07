import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forRoot([
        { path: '', loadChildren: './home/home.module#HomeModule' },
        { path: '**', pathMatch: 'full', loadChildren : './not-found/not-found.module#NotFoundModule' }
    ])],
    exports: [RouterModule],
})
export class AppRoutingModule { }

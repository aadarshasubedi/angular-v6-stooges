import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forRoot([
        { path: '', loadChildren: './home/home.module#HomeModule' },
    ])],
    exports: [RouterModule],
})
export class AppRoutingModule { }

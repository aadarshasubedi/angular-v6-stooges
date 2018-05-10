import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { AutoResizeDirective } from './directives/auto-resize.directive';

@NgModule({
  imports: [],
  exports: [
    NgCommonModule,
    AutoResizeDirective
  ],
  declarations: [AutoResizeDirective]
})
export class CommonModule { }

import { NgModule } from '@angular/core';

import { FGroupDirective } from './directives/f-group.directive';
import { FGroupNameDirective } from './directives/f-group-name.directive';

/*
  note :
  所有的验证和 default value 写在 class 上没问题
  除了 array, 因为 default value 会破坏 $expand 的场景
  验证也是一样, 所以 array 的 default value 和验证 length required 等, 请在 post 的时候自己写限制.
*/

@NgModule({
  imports: [],
  exports: [
    FGroupDirective,
    FGroupNameDirective
  ],
  declarations: [
    FGroupDirective,
    FGroupNameDirective
  ]
})
export class EntityModule { }

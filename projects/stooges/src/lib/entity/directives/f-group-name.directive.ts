import { FGroupDirective } from './f-group.directive';
import { FGroup } from '../edm-form.service';
import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[fGroupName]'
})
export class FGroupNameDirective implements OnInit {

  constructor(
    private parent: FGroupDirective
  ) { }

  ngOnInit() {
    this.fGroup = this.parent.fGroup[this.fGroupName];
  }

  @Input()
  fGroupName: string;

  fGroup: FGroup;

}

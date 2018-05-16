import { ChangeDetectionStrategy, Component, Input, OnInit, forwardRef } from '@angular/core';
import { AbstractAccessorComponent } from '../../../../form/components/abstract-accessor';
import { InvalidFocus } from '../../../../form/types';


type Item = any;
export type GetValueFn = (item: Item) => any;
export type GetDisplayFn = (item: Item) => any;
export type CompareWithFn = (item1: Item, item2: Item) => boolean

let defaultGetValue: GetValueFn = (item: Item) => {
  return item;
};
let defaultGetDisplay: GetDisplayFn = defaultGetValue;
let defaultCompareWith: CompareWithFn = (o1, o2) => {
  return o1 === o2;
}

@Component({
  selector: 's-mat-simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: ['./simple-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AbstractAccessorComponent,
      useExisting: forwardRef(() => MatSimpleSelectComponent)
    },
    {
      provide: InvalidFocus,
      useExisting: forwardRef(() => MatSimpleSelectComponent)
    }
  ]
})
export class MatSimpleSelectComponent extends AbstractAccessorComponent implements OnInit {

  @Input()
  items: Item[];

  internalGetValue = defaultGetValue;

  @Input()
  set getValue(getValueFn: GetValueFn) {
    this.internalGetValue = getValueFn || defaultGetValue;
  }

  internalGetDisplay = defaultGetDisplay;

  @Input()
  set getDisplay(getDisplayFn: GetDisplayFn) {
    this.internalGetDisplay = getDisplayFn || defaultGetDisplay;
  }

  internalCompareWith = defaultCompareWith;

  @Input()
  set compareWith(compareWithFn: CompareWithFn) {
    this.internalCompareWith = compareWithFn || defaultCompareWith;
  }

  @Input()
  hidePleaseSelect = false;

  @Input()
  loading = false;

  @Input()
  multiple = false; // not change able

  async ngOnInit() {
    // multiple 肯定没有 please select 选
    if(this.multiple) this.hidePleaseSelect = true; 
    super.ngOnInit();
  }

}



import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
  ContentChildren,
  AfterContentInit,
  QueryList,
  ChangeDetectorRef
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { MatRadioButton } from '@angular/material/radio';


/*
   note: 
   参考 checkbox list 做的   
*/

type Model = any;
type PublishMethod = (value: Model) => void;


@Component({
  selector: 's-mat-base-radio-list',
  templateUrl: './base-radio-list.component.html',
  styleUrls: ['./base-radio-list.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatBaseRadioListComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatBaseRadioListComponent implements OnInit, ControlValueAccessor, AfterContentInit {

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  private defaultCompareWith = (o1: any, o2: any) => o1 === o2;
  private _compareWith = this.defaultCompareWith;
  @Input()
  get compareWith() { return this._compareWith; }
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    this._compareWith = fn || this.defaultCompareWith;
    if (this.radioQueryList) {
      this.modelToView();
    }
  }

  @Input()
  defaultValue: any

  focus() {
    let radios = this.radioQueryList.toArray().filter(r => !r.disabled);
    if (radios.length) {
      radios[0].focus();
    }
  }

  value: Model;

  @ContentChildren(MatRadioButton, { read: MatRadioButton })
  radioQueryList: QueryList<MatRadioButton>

  modelToView() {
    let radios = this.radioQueryList.toArray();
    radios.forEach(r => {
      r.checked = this.compareWith(r.value, this.value);
    });
  }

  viewToModel() {
    let radios = this.radioQueryList.toArray();
    let radio = radios.find(c => c.checked);
    this.value = radio ? radio.value : this.defaultValue;
    this.publish(this.value);
  }

  ngAfterContentInit() {
    let beforeRadios: MatRadioButton[] = [];
    this.radioQueryList.changes.pipe(startWith(null)).subscribe(_ => {
      let afterRadios = this.radioQueryList.toArray();
      let addedRadios = afterRadios.filter(afterRadio => beforeRadios.find(beforeRadio => afterRadio == beforeRadio) == null);
      for (let addedRadio of addedRadios) {
        // 每个都 watch, 只有一个会触发
        addedRadio.change.subscribe(() => {
          this.touch();
          this.viewToModel();
        });
      }
      console.log('dadatata');
      this.modelToView();
    });
    setTimeout(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnInit() {

  }

  writeValue(value: Model): void {
    this.value = value;
    if (this.radioQueryList) {     
      this.modelToView();
    }
  }

  registerOnChange(fn: PublishMethod): void {
    this.publish = fn;
  }

  registerOnTouched(fn: any): void {
    this.touch = fn;
  }

  private publish: PublishMethod;
  private touch: any;

}

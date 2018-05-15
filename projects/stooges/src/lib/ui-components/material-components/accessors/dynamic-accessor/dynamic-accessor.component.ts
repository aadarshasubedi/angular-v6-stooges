import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Injector } from '@angular/core';
import { FControl, FGroup } from '../../entity/edm-form.service';
import { FormControl } from '@angular/forms';
import { METADATA_KEY, EnumMetadata, EnumItem, UrlTitleMetadata, ForeignKeyMetadata, ResourceMetadata, ServiceMetadata, ForeignKeySelectMetadata, ResourcesMetadata } from '../../entity/decorators';
import { AccessorType } from '../types';
import { stooges } from '../../../stooges/stooges';
import { GetValueFn, GetDisplayFn, CompareWithFn } from '../simple-select/simple-select.component';
import { Entity } from '../../../stooges/types';
import { ResourceService } from '../../entity/resource.service';

@Component({
  selector: 's-mat-dynamic-accessor',
  templateUrl: './dynamic-accessor.component.html',
  styleUrls: ['./dynamic-accessor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicAccessorComponent implements OnInit {

  constructor(
    private cdr: ChangeDetectorRef,
    private injector: Injector
  ) { }

  @Input()
  fControl: FControl

  @Input('control')
  formControl: FormControl

  accessorType: AccessorType

  simpleSelectGetValue: GetValueFn
  simpleSelectGetDisplay: GetDisplayFn
  simpleSelectItems: any
  simpleSelectMultiple: boolean
  simpleSelectCompareWith: CompareWithFn
  simpleSelectLoading: boolean

  urlTitle: string | null = null;

  async ngOnInit() {

    let has = (key: string) => {
      return this.fControl.hasMetadata(key);
    }

    let type = this.fControl.getMetadata(METADATA_KEY.Type);
    let enumMetadata = this.fControl.getMetadata(METADATA_KEY.Enum) as EnumMetadata;
    let foreignKeyMetadata = this.fControl.getMetadata(METADATA_KEY.ForeignKey) as ForeignKeyMetadata;
    let resourcesMetadata = this.fControl.getMetadata(METADATA_KEY.Resources) as ResourcesMetadata;

    if (has(METADATA_KEY.Email)) {
      this.accessorType = 'Email';
    }
    else if (has(METADATA_KEY.Date)) {
      this.accessorType = 'DatePicker';
    }
    else if (has(METADATA_KEY.Ckeditor)) {
      this.accessorType = 'Ckeditor';
    }
    else if (has(METADATA_KEY.Time)) {
      this.accessorType = 'TimePicker';
    }
    else if (has(METADATA_KEY.Textarea)) {
      this.accessorType = 'Textarea';
    }
    else if (has(METADATA_KEY.Image) || has(METADATA_KEY.File)) {
      this.accessorType = 'Upload';
    }
    else if (has(METADATA_KEY.LongText)) {
      this.accessorType = 'LongText';
    }
    else if (has(METADATA_KEY.Password)) {
      this.accessorType = 'Password';
    }
    else if (enumMetadata) {
      this.accessorType = 'SimpleSelect';
      this.simpleSelectItems = enumMetadata.items;
      this.simpleSelectMultiple = enumMetadata.multiple;
      this.simpleSelectGetValue = (item: EnumItem) => {
        return item.value;
      }
      this.simpleSelectGetDisplay = (item: EnumItem) => {
        return item.display || stooges.valueToDisplay(item.value);
      }
    }
    else if (foreignKeyMetadata) {
      let resourceMetadata = Reflect.getMetadata(METADATA_KEY.Resource, (this.fControl.$parent as FGroup).resource, foreignKeyMetadata.linkTo) as ResourceMetadata;
      let constructor = resourceMetadata.getConstructor();
      let serviceMetadata = Reflect.getMetadata(METADATA_KEY.Service, constructor) as ServiceMetadata;
      let foreignSelectMetadata = Reflect.getMetadata(METADATA_KEY.ForeignKeySelect, constructor) as ForeignKeySelectMetadata;
      let service = this.injector.get(serviceMetadata.getConstructor()) as ResourceService<Entity>;

      this.accessorType = 'SimpleSelect';
      this.simpleSelectMultiple = false;
      this.simpleSelectGetValue = (item: Entity) => {
        return item.Id;
      }
      this.simpleSelectGetDisplay = (item: any) => {
        return item[foreignSelectMetadata.display];
      }
      this.simpleSelectLoading = true;
      this.simpleSelectItems = await service.queryAsync({ $orderby: foreignSelectMetadata.orderby });
      this.simpleSelectLoading = false;
      this.cdr.markForCheck();
    }
    else if (resourcesMetadata) {
      // 除了 many to many 不可能进来
      let constructor = resourcesMetadata.getConstructor();
      let serviceMetadata = Reflect.getMetadata(METADATA_KEY.Service, constructor) as ServiceMetadata;
      let foreignSelectMetadata = Reflect.getMetadata(METADATA_KEY.ForeignKeySelect, constructor) as ForeignKeySelectMetadata;
      let service = this.injector.get(serviceMetadata.getConstructor()) as ResourceService<Entity>;

      this.accessorType = 'SimpleSelect';
      this.simpleSelectMultiple = true;
      this.simpleSelectCompareWith = (item1: Entity, item2: Entity) => {
        return item1.Id === item2.Id;
      }
      this.simpleSelectGetDisplay = (item: any) => {
        return item[foreignSelectMetadata.display];
      }
      this.simpleSelectLoading = true;
      this.simpleSelectItems = await service.queryAsync({ $orderby: foreignSelectMetadata.orderby });
      this.simpleSelectLoading = false;
      this.cdr.markForCheck();
    }
    else if (type === Number) {
      this.accessorType = 'Number';
    }
    else if (type === String) {
      let urlTitleMetadata = this.fControl.getMetadata(METADATA_KEY.UrlTitle) as UrlTitleMetadata;
      if (urlTitleMetadata) this.urlTitle = urlTitleMetadata.linkTo;
      this.accessorType = 'Text';
    }
    else if (type === Boolean) {
      this.accessorType = 'Checkbox';
    }
    else {
      console.error('no accessor BUG!');
    }
  }

}

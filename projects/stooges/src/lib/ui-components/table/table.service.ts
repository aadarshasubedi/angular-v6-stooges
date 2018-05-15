import { Injectable } from '@angular/core';
import { TableCellType } from './types';
import { EnumMetadata } from '../../decorators/Enum';
import { valueToDisplay } from '../../common/methods/value-to-display';
import { DisplayNameMetadata } from '../../decorators/DisplayName';
import { METADATA_KEY } from '../../decorators/metadata-key';


export class TControl {
  constructor(data?: Partial<TControl>) {
    Object.assign(this, data);
  }
  displayName: string
  sortable: boolean
  cellType: TableCellType
}

export class EnumTConrol extends TControl {
  constructor(data?: Partial<EnumTConrol>) {
    super();
    Object.assign(this, data);
  }
  enumMetadata: EnumMetadata
  valueToDisplay(value: string) {
    if (!value) return value;
    let item = this.enumMetadata.items.find(i => i.value == value)!;
    return item.display || valueToDisplay(item.value);
  }
}

export class TGroup {
  [propName: string]: TGroup | TControl | any
  keys(): string[] {
    return Object.keys(this);
  }
}

export interface KeyAndTControl {
  key: string,
  tControl: TControl
}


@Injectable({
  providedIn : 'root'
})
export class TableService {

  constructor() { }

  private generateDisplayName(resource: any, key: string, parentDisplayName?: string): string {
    let displayNameMetadata: DisplayNameMetadata = Reflect.getMetadata(METADATA_KEY.TableDisplayName, resource, key) || Reflect.getMetadata(METADATA_KEY.DisplayName, resource, key);
    let displayName = displayNameMetadata ? displayNameMetadata.name : valueToDisplay(key, 'spaceFirstUpper');
    return parentDisplayName ? parentDisplayName + ' ' + displayName : displayName;
  }

  private sortable(resource: any, key: string): boolean {
    let isImage = Reflect.hasMetadata(METADATA_KEY.Image, resource, key);
    if (isImage) return false;
    return true;
  }

  private selectCellType(resource: any, key: string): TableCellType {

    let type = Reflect.getMetadata(METADATA_KEY.Type, resource, key);

    if (Reflect.hasMetadata(METADATA_KEY.Image, resource, key)) {
      return 'Image';
    }
    else if (Reflect.hasMetadata(METADATA_KEY.File, resource, key)) {
      return 'File';
    }
    else if (Reflect.hasMetadata(METADATA_KEY.Textarea, resource, key)) {
      return 'Textarea';
    }
    else if (Reflect.hasMetadata(METADATA_KEY.Amount, resource, key)) {
      return 'Amount';
    }
    else if (Reflect.hasMetadata(METADATA_KEY.Youtube, resource, key)) {
      return 'Youtube';
    }
    else if (Reflect.hasMetadata(METADATA_KEY.Date, resource, key)) {
      return 'Date';
    }
    else if (Reflect.hasMetadata(METADATA_KEY.Datetime, resource, key)) {
      return 'Datetime';
    }
    else if (Reflect.hasMetadata(METADATA_KEY.Time, resource, key)) {
      return 'Time';
    }
    else if (Reflect.hasMetadata(METADATA_KEY.Enum, resource, key)) {
      return 'Enum';
    }
    else if (type == Boolean) {
      return 'Tick';
    }
    else {
      return 'Text';
    }
  }

  private createTConrol(resource: any, key: string): TControl {
    let enumMetadata = Reflect.getMetadata(METADATA_KEY.Enum, resource, key) as EnumMetadata;
    return (enumMetadata) ? new EnumTConrol({ enumMetadata }) : new TControl();
  }

  generateTControls(resource: any, parentKey?: string, parentDisplayName?: string): KeyAndTControl[] {
    let keyAndTControls: KeyAndTControl[] = [];
    const keys = Object.keys(resource);
    keys.forEach(key => {

      let value = resource[key];
      const isResource = Reflect.hasMetadata(METADATA_KEY.Resource, resource, key);
      const isResources = Reflect.hasMetadata(METADATA_KEY.Resources, resource, key);
      const isComplexType = Reflect.hasMetadata(METADATA_KEY.ComplexType, resource, key);
      const isSort = Reflect.hasMetadata(METADATA_KEY.Sort, resource, key);
      const isForeignKey = Reflect.hasMetadata(METADATA_KEY.ForeignKey, resource, key);
      const isKey = Reflect.hasMetadata(METADATA_KEY.Key, resource, key);

      if (isResources || isSort || isForeignKey || (parentKey && isKey)) {
        // skip 
      }
      else if (isResource || isComplexType) {
        let displayName = this.generateDisplayName(resource, key, parentDisplayName);
        keyAndTControls = [...keyAndTControls, ...this.generateTControls(value, key, displayName)]; // 递归
      }
      else {
        let tControl = this.createTConrol(resource, key);
        tControl.sortable = this.sortable(resource, key);
        tControl.displayName = this.generateDisplayName(resource, key, parentDisplayName);
        tControl.cellType = this.selectCellType(resource, key);
        let finalKey = parentKey ? parentKey + '.' + key : key;
        keyAndTControls.push({ key: finalKey, tControl });
      }
    });
    return keyAndTControls;
  }

}

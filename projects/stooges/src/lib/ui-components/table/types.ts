import { TControl } from "./models/TControl";
export type TableCellType = 'Tick' | 'Image' | 'Youtube' | 'File' | 'Text' | 'Textarea' | 'Amount' | 'Date' | 'Datetime' | 'Time' | 'Enum'

export interface KeyAndTControl {
    key: string,
    tControl: TControl
  }
import { TableCellType } from "../types";


export class TControl {
    constructor(data?: Partial<TControl>) {
      Object.assign(this, data);
    }
    displayName: string
    sortable: boolean
    cellType: TableCellType
  }
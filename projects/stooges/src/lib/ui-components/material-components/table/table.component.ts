import { Component, OnInit, ChangeDetectionStrategy, Input, TrackByFunction, Output, EventEmitter, AfterContentInit, ContentChildren, QueryList, ViewChild, ChangeDetectorRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { SortDirection, MatColumnDef, MatRowDef, MatTable } from '@angular/material';
import { ImageService } from '../../../common/services/image.service';
import { Entity } from '../../../types';
import { getByPath } from '../../../common/methods/get-by-path';
import { SImage } from '../../../models/Image';
import { KeyAndTControl } from '../../table/types';
import { MatTableGenerateRowNgClassFn } from './types';

type Resource = Entity;

@Component({
  selector: 's-mat-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MatTableComponent implements OnInit, AfterContentInit, OnDestroy {

  constructor(
    private cdr: ChangeDetectorRef,
    private imageService: ImageService
  ) { }

  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<Resource>>;
  @ViewChild(MatTable) matTable: MatTable<Resource>;
  ngAfterContentInit() {
    // note : 
    // mat 并不聪明，没有办法直接处理 ng-content, 需要自己手动 register    
    // refer : 
    // https://github.com/angular/material2/tree/master/src/demo-app/table/custom-table
    // https://github.com/angular/material2/issues/6980    
    this.columnDefs.forEach(columnDef => this.matTable.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.matTable.addRowDef(rowDef));
  }

  @Input()
  hideRemove: boolean = false;

  @Input()
  hideEdit: boolean = false;

  @Input()
  showDrag: boolean = false;

  private _displayedColumns: string[]
  get displayedColumns() {
    return this._displayedColumns;
  }
  @Input()
  set displayedColumns(value) {
    this._displayedColumns = [...value];
    if (this.showDrag) this._displayedColumns.unshift('drag');
    if (!this.hideEdit) this._displayedColumns.push('edit');
    if (!this.hideRemove) this._displayedColumns.push('remove');
  }

  @Input()
  dataSource: Observable<Resource>

  @Input()
  trackBy: TrackByFunction<Resource> = (index: number, item: Resource) => {
    if (!item) return index;
    return item.Id;
  }

  @Input()
  sort: string

  @Input()
  sortDirection: SortDirection

  @Output('sortChange')
  sortChangeEmitter = new EventEmitter<string>();

  @Input()
  keyAndTControls: KeyAndTControl[];

  @Input()
  cellDraggable: boolean

  @Output('cellDragstart')
  cellDragstartEmitter = new EventEmitter<{ resource: Resource }>();

  @Output('cellDragend')
  cellDragendEmitter = new EventEmitter<void>();

  @Output('remove')
  removeEmitter = new EventEmitter<{ resource: Resource }>();

  @Input()
  draggingData: Resource

  @Input()
  generateRowNgClassFn: MatTableGenerateRowNgClassFn<Resource>

  internalGenerateRowNgClassFn: MatTableGenerateRowNgClassFn<Resource> = (resource, index) => {
    let result = {};
    if (this.generateRowNgClassFn) result = {
      ...result,
      ...this.generateRowNgClassFn(resource, index)
    }
    if (this.showDrag) result = {
      ...result,
      ...{ onDrag: resource === this.draggingData }
    }
    return result;
  }

  @Input()
  rowSDragover: boolean

  @Output('rowDragenter')
  rowDragenterEmitter = new EventEmitter<{ resource: Resource, index: number }>();

  getByPath(row: Resource, path: string): any {
    let value = getByPath(row, path);
    return Array.isArray(value) ? value[0] : value;
  }

  empty(_index: number, resource: Resource | undefined) {
    return !resource;
  }

  notEmpty(_index: number, resource: Resource | undefined) {
    return resource;
  }

  sub = new Subscription();

  getBiggestImageSrc(image : SImage) {
    let imageData =  this.imageService.getData(image.$metadata, image.width, image.height, image.src);
    return this.imageService.getBiggestDescription(imageData).src;
  }

  ngOnInit() {
    // note mat table 不会每次 markForCheck, 可能是 bug, 先自己 mark 处理
    this.sub.add(
      this.dataSource.subscribe(_ => this.cdr.markForCheck())
    ); 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

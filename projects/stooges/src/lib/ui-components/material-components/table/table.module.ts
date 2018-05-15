import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { CommonModule } from '../../common/common.module';
import { MatTableModule, MatSortModule, MatIconModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    RouterModule,
    MatButtonModule
  ],
  exports : [TableComponent],
  declarations: [TableComponent]
})
export class TableModule { }

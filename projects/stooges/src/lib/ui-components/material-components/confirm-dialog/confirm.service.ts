import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

export type MatConfirmDialogResult = 'ok' | undefined;

@Injectable({
  providedIn : 'root'
})
export class MatConfirmDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  confirmAsync(title: string, keyword?: string, inputType?: 'password' | 'number'): Promise<MatConfirmDialogResult> {
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
        width: '300px',
        data: new ConfirmDialogData({
          title,
          keyword,
          inputType
        })
      });
      dialogRef.afterClosed().subscribe(result => {
        resolve(result);
      });
    });
  }
}

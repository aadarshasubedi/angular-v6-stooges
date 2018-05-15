import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

export type Result = 'ok' | undefined;

@Injectable({
  providedIn : 'root'
})
export class ConfirmService {

  constructor(
    private dialog: MatDialog
  ) { }

  confirmAsync(title: string, keyword?: string, inputType?: 'password' | 'number'): Promise<Result> {
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

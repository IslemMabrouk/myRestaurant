import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotConnectedDialogComponent } from '../shared/not-connected-dialog/not-connected-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

   openNotConnectedDialog(): void {
    this.dialog.open(NotConnectedDialogComponent, {
      width: '400px',
      disableClose: true
    });
  }
}

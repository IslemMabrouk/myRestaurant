import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-status-change-dialog',
  template: `
    <h2 mat-dialog-title>Change Status</h2>
    <mat-dialog-content>
      Are you sure you want to change the status to <strong>{{ newStatus }}</strong>?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button color="primary" (click)="confirm()">Yes</button>
    </mat-dialog-actions>
  `
})
export class StatusChangeDialogComponent {
  newStatus: string;

  constructor(
    public dialogRef: MatDialogRef<StatusChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newStatus = data.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
  }

  confirm() {
    this.dialogRef.close(this.newStatus);
  }
}

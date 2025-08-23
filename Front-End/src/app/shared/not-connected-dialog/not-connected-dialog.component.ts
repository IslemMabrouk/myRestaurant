import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-connected-dialog',
  templateUrl: './not-connected-dialog.component.html',
  styleUrls: ['./not-connected-dialog.component.css']
})
export class NotConnectedDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NotConnectedDialogComponent>,
    private router: Router) { }

  ngOnInit(): void {
  }

   goToLogin() {
    this.dialogRef.close(); // Close the popup
    this.router.navigate(['/signin']); // Navigate to login page
  }

}

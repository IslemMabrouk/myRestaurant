import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartSuccessDialogComponent } from 'src/app/dashboard/cart-success-dialog/cart-success-dialog.component';

@Component({
  selector: 'app-disply-food-item',
  templateUrl: './disply-food-item.component.html',
  styleUrls: ['./disply-food-item.component.css']
})
export class DisplyFoodItemComponent implements OnInit {

  constructor(private router:Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  goToCkeckout(): void {
    const dialogRef = this.dialog.open(CartSuccessDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'cart') {
        // Navigate to the cart page
        console.log('Redirecting to the cart...');
      } else if (result === 'continue') {
        // Stay on the page
        console.log('Continuing shopping...');
      }
    });
  }
}

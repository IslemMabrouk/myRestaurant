import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-success-dialog',
  templateUrl: './cart-success-dialog.component.html',
  styleUrls: ['./cart-success-dialog.component.css']
})
export class CartSuccessDialogComponent implements OnInit {
  constructor(private router:Router, private dialogRef: MatDialogRef<CartSuccessDialogComponent>) {}

  ngOnInit(): void {
  }

  onContinue(): void {
    this.router.navigate(["foodMenu"])
    this.dialogRef.close('continue');
  }

  goToCart(): void {
    this.router.navigate(["cart"])
    this.dialogRef.close('cart');
  }
}

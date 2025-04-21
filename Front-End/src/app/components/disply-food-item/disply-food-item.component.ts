import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CartSuccessDialogComponent } from 'src/app/dashboard/cart-success-dialog/cart-success-dialog.component';
import { Plat } from 'src/app/interfaces/Plat';
import { PlatService } from 'src/app/services/plat.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-disply-food-item',
  templateUrl: './disply-food-item.component.html',
  styleUrls: ['./disply-food-item.component.css']
})
export class DisplyFoodItemComponent implements OnInit {

  platId: any;
  plat: Plat = new Plat();
  quantity: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private platService: PlatService,
    private orderService: OrderService // Inject OrderService
  ) { }

  ngOnInit(): void {
    this.platId = this.activatedRoute.snapshot.paramMap.get('platId');

    this.platService.getPlatById(this.platId).subscribe((data) => {
      this.plat = data;
    });
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goToCheckout(): void {
    // Add plat and quantity to the cart
    this.orderService.addToCart(this.plat, this.quantity);

    // Open the dialog
    const dialogRef = this.dialog.open(CartSuccessDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'cart') {
        // Navigate to the cart page
        console.log('Redirecting to the cart...');
        // Example: this.router.navigate(['/cart']);
      } else if (result === 'continue') {
        // Stay on the page
        console.log('Continuing shopping...');
      }
    });
  }
}

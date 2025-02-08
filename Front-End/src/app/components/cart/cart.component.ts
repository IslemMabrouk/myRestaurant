import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = [{ name: 'Blue denim shirt', quantity: 1, price: 17.99 }];

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToCkeckout(){
    this.router.navigate(["bill"])
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }
}

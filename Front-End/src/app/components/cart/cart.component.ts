import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DatePipe]
})
export class CartComponent implements OnInit {
  items: any[] = [];

  constructor(private router: Router, 
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.items = this.orderService.getCartItems();
  }

  getTotalQuantity(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  goToCheckout(): void {
    this.router.navigate(["bill"]);
  }

  decreaseQuantity(item: any) {
    this.orderService.decreaseItemQuantity(item.plat.id);
    this.items = this.orderService.getCartItems();
  }

  increaseQuantity(item: any) {
    this.orderService.increaseItemQuantity(item.plat.id);
    this.items = this.orderService.getCartItems();
  }

  removeItemById(id: number): void {
  this.orderService.removeItemById(id);
  this.items = this.orderService.getCartItems();
  }
  

  goToCkeckout() {
    this.router.navigate(["bill"]);
  }

  calculateTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.plat.price * item.quantity), 0);
  }

  calculateVATTotalPrice(): number {
    let TotalPrice = this.calculateTotalPrice();
    if (this.calculateTotalPrice() <= 100) TotalPrice=this.calculateTotalPrice()+4;
    console.log(TotalPrice);
    
    return (TotalPrice + TotalPrice*0.18);
  }

  shipping(){
    if (this.calculateTotalPrice() > 100) return ["Free" , 'green']
    else return ["4 $" , 'red']
  }

}

import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  users: any[] = [];
  orders: any[] = [];
  pendingOrders: any[] = [];
  totalPrice: any;
  constructor(private userService: UserService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
    
    this.orderService.getAllOrders().subscribe(
      (data: any) => {
        this.orders = data;
        this.totalPrice = this.orders.reduce((sum, order) => sum + order.price, 0);
        this.pendingOrders = data.filter((order: any) => order.status === 'PENDING');
        console.log(this.pendingOrders.length);
        
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

}

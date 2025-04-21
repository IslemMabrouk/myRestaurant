import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  connected = false;
  totalQuantity: number = 0;

  constructor(private authService : AuthService,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.connected = status;
    });

    this.orderService.totalQuantity$.subscribe(quantity => {
      this.totalQuantity = quantity;
    });
  }

  editProfile(){
    this.router.navigate([`editProfile/${this.authService.getUserId()}`])
  }

  logout() {
    this.authService.logout();
  }

}

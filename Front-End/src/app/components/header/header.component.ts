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
  userInfo:any;

  constructor(private authService : AuthService,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit(): void {
   this.userInfo = this.authService.getUserInfo();
   console.log(this.userInfo);

    this.authService.isLoggedIn$.subscribe((status) => {
      this.connected = status;
    });

    this.orderService.totalQuantity$.subscribe(quantity => {
      this.totalQuantity = quantity;
    });

  }

  editProfile(){
    this.router.navigate([`clientSpace/${this.authService.getUserInfo()?.id}`])
  }

  logout() {
    this.authService.logout();
  }

}

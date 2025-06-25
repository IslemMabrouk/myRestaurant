import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isMenuFixed = false;
  connected = false;
  totalQuantity: number = 0;
  userInfo: any;

  constructor(private authService: AuthService,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        const routesWithFixedMenu = [''];
        this.isMenuFixed = !routesWithFixedMenu.includes(currentRoute);
      }
    });

    this.userInfo = this.authService.getUserInfo();

    this.authService.isLoggedIn$.subscribe((status) => {
      this.connected = status;
    });

    this.orderService.totalQuantity$.subscribe(quantity => {
      this.totalQuantity = quantity;
    });

  }

  navigateToLogin() {
    this.router.navigate(['/signin']);
  }

  editProfile() {
    this.router.navigate([`clientSpace/${this.authService.getUserInfo()?.id}`])
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}

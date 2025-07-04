import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  userInfo: any;
  constructor(private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
  }

  logout() {
    this.authService.logout();
    this.router.navigate([''])
  }

  editProfile() {
    this.router.navigate([`editAdmin/${this.userInfo.id}`])
  }
}

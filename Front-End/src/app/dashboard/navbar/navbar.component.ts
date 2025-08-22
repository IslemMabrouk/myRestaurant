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
  role:any;

  constructor(private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    if (this.userInfo.roles.includes('ROLE_CHEF')) {
      this.role = 'CHEF'
    }
    else {
      this.role = 'ADMIN'
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate([''])
  }

  editProfile() {
    this.router.navigate([`editAdmin/${this.userInfo.id}`])
  }
}

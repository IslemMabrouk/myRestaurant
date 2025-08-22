import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userInfo:any;
  role:any;

  constructor(private router:Router,private authService: AuthService) { }
  isDarkMode: boolean = false;

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    if (this.userInfo.roles.includes('ROLE_CHEF')) {
      this.role = 'Chef'
    }
    else {
      this.role = 'Admin'
    }
  }

  goToUserManagment(){
    this.router.navigate(["bill"])
  }

  toggleDarkMode(isDarkMode: boolean): void {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }
  
}

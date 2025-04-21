import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Model to bind form data
  login = {
    email: '',
    pwd: ''
  };

  hide = true;

  constructor(private router: Router, 
    private userService: UserService,
    private authService:AuthService) { }

  /**
   * Method to handle login submission
   * @param form 
   */
  logIn() {
    if (this.login.email && this.login.pwd) {
      console.log('Login submitted:', this.login);
  
      this.userService.login(this.login).subscribe(
        (res) => {
          const roles = res.roles;
  
          // Optionally store token if needed for future requests
          this.authService.login(res);
  
          if (roles.includes('ROLE_CLIENT')) {
            this.router.navigate(['']);
          } else if (roles.includes('ROLE_CHEF') || roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Unknown role:', roles);
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    } else {
      console.error('Login form is invalid!');
    }
  }
  
  
}

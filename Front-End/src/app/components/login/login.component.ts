import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private router: Router, private userService: UserService) { }

  /**
   * Method to handle login submission
   * @param form 
   */
  logIn() {
    if (this.login.email && this.login.pwd) {
      console.log('Login submitted:', this.login);
  
    //   this.userService.getUserRole(this.login.email).subscribe(
    //     (role) => {
    //       if (role === 'client') {
    //         this.router.navigate(['/home']); 
    //       } else if (role === 'chef' || role === 'admin') {
    //         this.router.navigate(['/dashboard']);  
    //       } else {
    //         console.error('Unknown role:', role);
    //       }
    //     },
    //     (error) => {
    //       console.error('Error fetching role:', error);
    //     }
    //   );
    // } else {
    //   console.error('Login form is invalid!');
    }
  }
  
}

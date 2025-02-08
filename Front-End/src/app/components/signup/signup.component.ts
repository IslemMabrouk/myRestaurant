import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true; // For toggling password visibility
  signupForm!: UntypedFormGroup; // Form group for signup
  messageAdd: any; // Response message after user signup

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Initialize the signup form with validation
    this.signupForm = this.fb.group(
      {
        firstName: ['', [Validators.minLength(3), Validators.required]],
        lastName: ['', [Validators.minLength(5), Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        pwd: ['', [Validators.minLength(8), Validators.required]],
        confirmPwd: ['', Validators.required],
        tel: ['', [Validators.minLength(8), Validators.maxLength(13), Validators.required]],
      }, { 
        validators: this.passwordMatchValidator 
      }
    );
  }

  // Custom validator to match passwords
  passwordMatchValidator(form: UntypedFormGroup) {
    const password = form.get('pwd')?.value;
    const confirmPwd = form.get('confirmPwd')?.value;
    if (password !== confirmPwd) {
      return { passwordsNotMatching: true };
    }
    return null;
  }

  /**
   * Method to handle user signup
   * @param formValue - The value of the signup form
   */
  signup(formValue: any): void {
    // Send only the role name, not the id
    const role = { name: 'client' };  // Only send role name
    
    formValue.roles = [role];  // Ensure it's an array
    console.log(formValue);
    
    // Call the user service to add the user with the form data
    this.userService.addUser(formValue).subscribe(
      (data) => {
        this.messageAdd = data;
        console.log('Signup success:', data);
        if (data) {
          // Navigate to the login page (or any other route after successful signup)
          this.router.navigate(['/signin']);
        }
      },
      (error) => {
        console.error('Signup error:', error);
        console.error('Error Response:', error.error);
      }
    );
  }
  
  
  
}

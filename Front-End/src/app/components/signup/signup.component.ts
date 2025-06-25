import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userId: any;
  user: User = new User();
  hide = true; // For toggling password visibility
  signupForm!: UntypedFormGroup;
  messageAdd: any
  userRole: string[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
        
    this.userRole = ["ROLE_CLIENT"];

    // Initialize the signup form with validation
    this.signupForm = this.fb.group(
      {
        firstName: ['', [Validators.minLength(3), Validators.required]],
        lastName: ['', [Validators.minLength(5), Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        address: ['', [Validators.minLength(5), Validators.required]],
        pwd: ['', [Validators.minLength(8), Validators.required]],
        confirmPwd: ['', Validators.required],
        phone: ['', [Validators.minLength(8), Validators.maxLength(13), Validators.required]],
      }, { 
        validators: this.passwordMatchValidator 
      }
    );

  }

  // Custom validator to match passwords
passwordMatchValidator(form: UntypedFormGroup) {
  const passwordControl = form.get('pwd');
  const confirmPwdControl = form.get('confirmPwd');

  if (!passwordControl || !confirmPwdControl) return null;

  // If other errors exist on confirmPwd, do not overwrite them
  if (confirmPwdControl.errors && !confirmPwdControl.errors['passwordsNotMatching']) {
    return null;
  }

  if (passwordControl.value !== confirmPwdControl.value) {
    confirmPwdControl.setErrors({ passwordsNotMatching: true });
  } else {
    confirmPwdControl.setErrors(null);
  }

  return null;
}

  /**
   * Method to handle user signup
   * @param formValue - The value of the signup form
   */
  signup(formValue: any): void {
    
    formValue = { ...this.signupForm.value, roles: this.userRole };
    delete formValue.confirmPwd;
    console.log(formValue);
    

    this.userService.addUser(formValue).subscribe(
      (data) => {
        this.messageAdd = data;
        console.log('Signup success:', data);
        if (data) {
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

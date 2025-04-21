import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userId: any;
  title!: String;
  user: User = new User();
  hide = true; // For toggling password visibility
  signupForm!: UntypedFormGroup;
  messageAdd: any
  userRole: string[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
        
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

    if (this.userId) {
      // Edit mode
      this.title = 'Edit Profile';
      const userInfo = this.authService.getUserInfo();
      this.signupForm = this.formBuilder.group({
        firstName: [userInfo?.firstName || ''],
        lastName: [userInfo?.lastName || ''],
        address: [''],
        pwd: [''],
        confirmPwd: [''],
        phone: [''],
        email: [userInfo?.email || '']
      });      
       
    } else {
      // Add mode
      this.title = 'Sign Up';
    }

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
    
    formValue = { ...this.signupForm.value, roles: this.userRole };
    delete formValue.confirmPwd;

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

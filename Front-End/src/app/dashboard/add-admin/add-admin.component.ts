import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  addAdminForm!: FormGroup;
  userRole: string[] = [];
  id: any;
  title!: string;
  user!: User;
  userInfo!:any;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.id = this.activatedRoute.snapshot.paramMap.get('userId');
    this.userRole = ["ROLE_ADMIN"];

    // Initialize the form
    this.addAdminForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]],
      pwd: ["", [Validators.required, Validators.minLength(6)]],
      experience: ["", [Validators.required, Validators.min(1)]],
    });

    if (this.id && this.userInfo.roles == 'ROLE_ADMIN') {
      console.log(this.loadUserByID());
      
      // Edit mode
      this.title = 'Edit Admin';
        this.addAdminForm.patchValue({
          firstName: this.userInfo?.firstName || '',
          lastName: this.userInfo?.lastName || '',
          email: this.userInfo?.email || '',
          phone: this.userInfo?.phone || '',
          address: this.userInfo?.address || '',
          experience: this.userInfo?.experience || ''
        });
    } else {
      // Add mode
      this.title = 'Add Admin';
    }
  }

  addOrUpdateAdmin(): void {
    if (this.addAdminForm.valid) {
      const formValue = { ...this.addAdminForm.value, roles: this.userRole };

      // In the case of update, remove pwd from the payload if it is disabled (no change to pwd)
      if (this.id && this.addAdminForm.get('pwd')?.disabled) {
        delete formValue.pwd;
      }

      if (this.id) {
        // Update logic
        this.userService.updateUser(this.id, formValue).subscribe(
          (data) => {
            this.toastr.success('ADMIN UPDATED SUCCESSFULLY!');
            this.resetReactiveForm(this.addAdminForm);
            console.log("Admin updated successfully:", data);
          },
          (error) => {
            console.error("Error updating admin:", error);
          }
        );
      } else {
        // Add logic
        this.userService.addUser(formValue).subscribe(
          (data) => {
            this.toastr.success('ADMIN ADDED SUCCESSFULLY!');
            this.resetReactiveForm(this.addAdminForm);
            console.log("Admin added successfully:", data);
          },
          (error) => {
            console.error("Error adding admin:", error);
          }
        );
      }
    } else {
      console.error("Form is invalid!");
    }
  }

  resetReactiveForm(form: FormGroup) {
    form.reset();
    form.markAsPristine();
    form.markAsUntouched();
    Object.keys(form.controls).forEach(key => {
      form.get(key)?.setErrors(null);
    });
  }

    loadUserByID(): void {
    this.userService.getUserById(this.id).subscribe((data) => {
      this.user = data;
     console.log(this.user);
     
    });
  }

}

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

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
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

    if (this.id) {
      // Edit mode
      this.title = 'Edit Admin';
      const userInfo = this.authService.getUserInfo();
        this.addAdminForm.patchValue({
          firstName: userInfo?.firstName || '',
          lastName: userInfo?.lastName || '',
          email: userInfo?.email || '',
          phone: userInfo?.phone || '',
          address: userInfo?.address || '',
          experience: userInfo?.experience || ''
        });

        // pwd should remain empty for security
        this.addAdminForm.get('pwd')?.disable(); // Disable pwd in edit mode
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

}

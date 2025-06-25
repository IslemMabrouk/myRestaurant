import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-chef',
  templateUrl: './add-chef.component.html',
  styleUrls: ['./add-chef.component.css']
})
export class AddChefComponent implements OnInit {
  addChefForm!: FormGroup;
  userRole: string[] = [];
  title!: String;
  id: any;
  user!: User;


  constructor(private fb: FormBuilder, private ChefService: UserService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('userId');
    this.userRole = ["ROLE_CHEF"];


    this.addChefForm = this.fb.group({
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
      this.title = 'Edit Chef';

      this.userService.getUserById(this.id).subscribe((data) => {
        this.user = data;

        // Populate the form with user data
        this.addChefForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          phone: this.user.phone,
          address: this.user.address,
          experience: this.user.experience
        });

        // Password should remain empty for security
        this.addChefForm.get('pwd')?.disable();
      });
    } else {
      // Add mode
      this.title = 'Add Chef';
    }

  }

  addChef() {
    if (this.addChefForm.valid) {
      const formValue = { ...this.addChefForm.value, roles: this.userRole };

      if (this.id) {
        // Remove password from payload if disabled
        delete formValue.pwd;

        this.userService.updateUser(this.id, formValue).subscribe(
          (data) => {
            this.toastr.success('CHEF UPDATED SUCCESSFULLY!');
            console.log("Chef updated successfully:", data);
          },
          (error) => {
            console.error("Error updating Chef:", error);
          }
        );
      } else {
        // Add logic
        this.userService.addUser(formValue).subscribe(
          (data) => {
            this.toastr.success('CHEF ADDED SUCCESSFULLY!');
            this.resetReactiveForm(this.addChefForm);

            console.log("Chef added successfully:", data);
          },
          (error) => {
            console.error("Error adding Chef:", error);
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

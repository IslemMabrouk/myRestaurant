import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatService } from 'src/app/services/plat.service'; // Adjust based on your service location
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-plat',
  templateUrl: './add-plat.component.html',
  styleUrls: ['./add-plat.component.css']
})
export class AddPlatComponent implements OnInit {
  addPlatForm!: FormGroup;
  successMessage: string = '';
  title!: string;
  chefInfo: any; // Chef ID
  platId: any; // Plat ID
  plat: any;

  constructor(
    private fb: FormBuilder,
    private platService: PlatService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    // Fetch IDs from the route
    this.chefInfo = this.authService.getUserInfo();;
    this.platId = this.activatedRoute.snapshot.paramMap.get('platId'); // Only present for edit mode

    this.addPlatForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    if (this.platId) {
      // Edit mode
      this.title = 'Edit Meal';
      this.loadPlatDetails(this.platId);
    } else {
      // Add mode
      this.title = 'Add Meal';
    }
  }

  loadPlatDetails(platId: any): void {
    this.platService.getPlatById(platId).subscribe((data) => {
      this.plat = data;
      this.addPlatForm.patchValue({
        name: this.plat.name,
        price: this.plat.price,
        category: this.plat.category,
        description: this.plat.description
      });
    });
  }

  addPlat(): void {
    if (this.addPlatForm.valid) {
      const platData = this.addPlatForm.value;

      if (this.platId) {
        // Edit Plat Logic
        this.platService.updatePlat(this.platId, platData).subscribe(
          (data) => {
            console.log('Plat updated successfully:', data);
            this.router.navigate(['/platsTable']); // Redirect after success
          },
          (error) => {
            console.error('Error updating Plat:', error);
          }
        );
      } else {
        // Add Plat Logic
        platData.chefId = this.chefInfo.id; // Include Chef ID in the request
        this.platService.addPlat(platData).subscribe(
          (response) => {
            this.successMessage = 'Plat added successfully!';
            console.log('Plat added:', response);
            this.addPlatForm.reset();
            this.router.navigate(['/platsTable']); // Redirect after success
          },
          (error) => {
            console.error('Error adding Plat:', error);
          }
        );
      }
    } else {
      console.error('Form is invalid!');
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CartSuccessDialogComponent } from 'src/app/dashboard/cart-success-dialog/cart-success-dialog.component';
import { Plat } from 'src/app/interfaces/Plat';
import { PlatService } from 'src/app/services/plat.service';
import { OrderService } from 'src/app/services/order.service';
import { ReviewComponent } from '../review/review.component';
import { ReviewService } from 'src/app/services/review.service';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NotConnectedDialogComponent } from 'src/app/shared/not-connected-dialog/not-connected-dialog.component';

@Component({
  selector: 'app-disply-food-item',
  templateUrl: './disply-food-item.component.html',
  styleUrls: ['./disply-food-item.component.css']
})
export class DisplyFoodItemComponent implements OnInit {

  platId: any;
  plat: Plat = new Plat();
  quantity: number = 1;
  selectedReview: any;
  @ViewChild('reviewsComponent', { static: false }) reviewsComponent!: ReviewComponent;
  pendingReview: any = null;
  reviews: any[] = [];
  averageRating: number = 0;
  userInfo:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private platService: PlatService,
    private orderService: OrderService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.platId = this.activatedRoute.snapshot.paramMap.get('platId');

    this.platService.getPlatById(this.platId).subscribe((data) => {
      this.plat = data;
    });

    this.reviewService.getAllReviews().subscribe(
    (data: any[]) => {
      this.reviews = data.filter(r => r.plat?.id === this.plat.id);

      if (this.reviews.length > 0) {
        const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
        this.averageRating = sum / this.reviews.length;
      }
    },
    (error: any) => {
      console.error('Error fetching users:', error);
    }
  );
  }

  getStars(): string[] {
  const stars: string[] = [];
  const fullStars = Math.floor(this.averageRating);
  const hasHalfStar = this.averageRating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push('star'); // full star
  }

  if (hasHalfStar) {
    stars.push('star_half'); // half star
  }

  while (stars.length < 5) {
    stars.push('star_border'); // empty star
  }

  return stars;
}


  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goToCheckout(): void {
    if (!this.authService.getUserId()) {
    // Open "not connected" dialog
    this.dialog.open(NotConnectedDialogComponent, {
      width: '400px',
    });
    return; // Stop further execution
  }
    // Add plat and quantity to the cart
    this.orderService.addToCart(this.plat, this.quantity);

    // Open the dialog
    const dialogRef = this.dialog.open(CartSuccessDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'cart') {
        // Navigate to the cart page
        console.log('Redirecting to the cart...');
        // Example: this.router.navigate(['/cart']);
      } else if (result === 'continue') {
        // Stay on the page
        console.log('Continuing shopping...');
      }
    });
  }

  onReviewEdit(review: any) {
    this.selectedReview = review;
  }

  onReviewChanged(event: { review: any, resetEditingId?: boolean }) {
    if (event.review) {
      this.reviewsComponent.updateReviewList(event.review);

      // Reset editingReviewId if needed
      if (event.resetEditingId) {
        this.reviewsComponent.editingReviewId = null;
      }
    } else {
      // If the child is not ready yet, store it
      this.pendingReview = event.review;
    }
  }

  // AfterViewInit, flush any pending review
  ngAfterViewInit(): void {
    if (this.pendingReview) {
      this.reviewsComponent.updateReviewList(this.pendingReview);
      this.pendingReview = null;
    }

  }

}

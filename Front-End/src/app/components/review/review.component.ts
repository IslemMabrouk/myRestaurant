import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plat } from 'src/app/interfaces/Plat';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ReviewService } from 'src/app/services/review.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() plat!: Plat;
  @Output() editReviewEvent = new EventEmitter<any>();
  editingReviewId: number | null = null;
  reviews: any[] = [];
  orders: any;
  userInfo: any;
  platId:any;

  constructor(private reviewService: ReviewService, private orderService: OrderService,
    private authService: AuthService, private wsService: WebsocketService, private ngZone: NgZone,
    private cd: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.platId = Number(this.activatedRoute.snapshot.paramMap.get('platId'));
    this.userInfo = this.authService.getUserInfo();
    // if (!this.plat?.id) return;

    this.reviewService.getAllReviews().subscribe(
      (data: any[]) => {
        console.log(data);
        this.reviews = data.filter(data => data.plat?.id === this.plat.id);
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );

    this.orderService.getAllOrders().subscribe(
      (data: any[]) => {
        this.orders = data;
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }
    );

    // Subscribe to WebSocket updates
    this.wsService.connect(this.platId).subscribe((review: any) => {
      const index = this.reviews.findIndex((r: any) => r.id === review.id);
      console.log('WS update received:', review);
      if (index >= 0) {
        // Update existing review
        this.reviews[index] = review;
      } else {
        // Add new review
        this.reviews.push(review);
      }
    });

  }

  editReview(reviewObj: any) {
    this.editingReviewId = reviewObj.id;
    this.editReviewEvent.emit(reviewObj);
  }

  deleteReview(reviewId: any) {
  this.reviewService.deleteReviewById(reviewId).subscribe(
    () => {
      console.log("review deleted");

      // Remove from UI immediately
      this.reviews = this.reviews.filter(r => r.id !== reviewId);
      this.cd.detectChanges();
    },
    (error) => {
      console.error("Error deleting review:", error);
    }
  );
}


  updateReviewList(review: any) {
    this.ngZone.run(() => {
      const index = this.reviews.findIndex(r => r.id === review.id);
      if (index >= 0) {
        this.reviews[index] = review;
      } else {
        this.reviews.push(review); // add at the end
      }
      this.reviews = [...this.reviews]; // trigger change detection
      this.cd.detectChanges();
    });

  }


  isConfirmed(review: any): boolean {
    return this.orders?.some((order: any) =>
      order.status === "COMPLETED" &&
      order.user.id === review.user.id &&
      order.items.some((item: any) => item.plat.id === this.plat.id)
    );
  }


}

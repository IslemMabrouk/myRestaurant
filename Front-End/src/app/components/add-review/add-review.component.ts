import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Plat } from 'src/app/interfaces/Plat';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import { NotConnectedDialogComponent } from 'src/app/shared/not-connected-dialog/not-connected-dialog.component';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() plat!: Plat;
  @Input() reviewToEdit: any;   // ✅ review passed from parent when editing
  @Input('rating') rating: number = 3;
  @Input('starCount') starCount: number = 5;
  @Input('color') color: string = 'accent';
  @Output() ratingUpdated = new EventEmitter();
  @Output() reviewChanged = new EventEmitter<{ review: any, resetEditingId?: boolean }>();


   snackBarDuration: number = 2000;
  ratingArr: number[] = [];
  userInfo!: any;
  isEditMode = false;

  comments = {
    userId: '',
    review: '',
    rating: 0
  };

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private reviewService: ReviewService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.comments.userId = this.userInfo.id;

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reviewToEdit'] && this.reviewToEdit) {
      this.isEditMode = true;
      this.comments.review = this.reviewToEdit.review;
      this.rating = this.reviewToEdit.rating;
    }
  }

submitReview(form: any) {
   if (!this.authService.getUserId()) {
      // Open "not connected" dialog
      this.dialog.open(NotConnectedDialogComponent, {
        width: '400px',
      });
      return; // Stop further execution
    }
  if (!this.comments.review || this.rating === 0) {
    this.snackBar.open('Please provide both review and rating', '', { duration: this.snackBarDuration });
    return;
  }

  const reviewPayload = { ...this.comments, rating: this.rating }; // <-- new object

  if (this.isEditMode) {
    this.reviewService.updateReview(this.reviewToEdit.id, reviewPayload).subscribe(
      (res) => {
        this.snackBar.open('Your review has been updated!', '', { duration: this.snackBarDuration });
        this.reviewChanged.emit({ review: res, resetEditingId: true });
        this.resetForm(form);
      }
    );
  } else {
    this.reviewService.addReview(this.plat.id, this.userInfo.id, reviewPayload).subscribe(
      (res) => {
        this.snackBar.open('Thank you for your comment!', '', { duration: this.snackBarDuration });
        this.reviewChanged.emit({ review: res, resetEditingId: true });
        this.resetForm(form);
      }
    );
  }
}


resetForm(form: any) {
  form.resetForm();
  this.rating = 0;
  this.isEditMode = false;
  this.reviewToEdit = null;

  // Emit null review to satisfy TypeScript
  this.reviewChanged.emit({ review: null, resetEditingId: true });

  this.comments = {
    userId: this.userInfo.id,
    review: '',
    rating: 0
  };
}


  rate(rating: number) {
    this.rating = rating;
    this.snackBar.open(`You rated ${rating} / ${this.starCount}`, '', { duration: this.snackBarDuration });
    this.ratingUpdated.emit(rating);
  }

  showIcon(index: number) {
    return this.rating >= index + 1 ? 'star' : 'star_border';
  }
}
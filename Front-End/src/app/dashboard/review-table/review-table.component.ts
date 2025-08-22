import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReviewService } from 'src/app/services/review.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-review-table',
  templateUrl: './review-table.component.html',
  styleUrls: ['./review-table.component.css']
})
export class ReviewTableComponent implements OnInit {

  displayedColumns: string[] = [
  'review_id',
  'user',
  'plat',
  'review',
  'rating',
  'created_at',
  'actions'
];

dataSource = new MatTableDataSource<any>();
@ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private reviewService: ReviewService, private dialog: MatDialog,
    private authService : AuthService
   ) { }

  userInfo:any;

  ngOnInit(): void {
     this.userInfo = this.authService.getUserInfo();
    this.loadReviews();
  }

  loadReviews() {
  this.reviewService.getAllReviews().subscribe((data: any[]) => {
    this.dataSource.data = data;
    console.log(data);
    if (this.userInfo.roles.includes('ROLE_ADMIN')) {
        this.dataSource = new MatTableDataSource<any>(data);
      } else if (this.userInfo.roles.includes('ROLE_CHEF')) {
        const filteredPlats = data.filter((plat:any) => plat.user.id === this.userInfo.id);
        this.dataSource = new MatTableDataSource<any>(filteredPlats);
        this.displayedColumns = this.displayedColumns.filter(col => col !== 'actions');
      }
    this.dataSource.paginator = this.paginator;
    
  });
}

deleteReview(id: number) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: { message: 'Are you sure you want to delete this review?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.reviewService.deleteReviewById(id).subscribe(() => {
        this.loadReviews();
      });
    }
  });
}
}
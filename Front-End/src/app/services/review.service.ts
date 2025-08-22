import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviewURL = environment.BaseUrl + "/api/reviews";

  constructor(private httpClient: HttpClient) { }

  getAllReviews(): Observable<any[]>  {
    return this.httpClient.get<any[]>(this.reviewURL);
  }

  addReview(platId:any, userId: any, reviewObj: any) {
    return this.httpClient.post(`${this.reviewURL}/${platId}/${userId}`, reviewObj);
  }

  updateReview(id:number, reviewObj: any) {
    return this.httpClient.put(`${this.reviewURL}/${id}`, reviewObj);
  }

  deleteReviewById(reviewId: number) {
    console.log(reviewId);
    
    return this.httpClient.delete(this.reviewURL + "/" + reviewId);
  }

}

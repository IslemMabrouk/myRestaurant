package com.example.myRestaurent.services;

import java.util.List;

import com.example.myRestaurent.models.ReviewModel;

public interface ReviewService {
	
	public ReviewModel addReview(Long platId, Long userId, ReviewModel obj);
	
	public List<ReviewModel> getAllReviews();
	
	public ReviewModel findReviewById(Long id);
	
	public ReviewModel saveReview(ReviewModel review);
	
	public void deleteReviewById(Long id);

}

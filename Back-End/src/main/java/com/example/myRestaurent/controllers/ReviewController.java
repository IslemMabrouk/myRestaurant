package com.example.myRestaurent.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myRestaurent.models.ReviewModel;
import com.example.myRestaurent.services.ReviewService;

@RestController
@RequestMapping("api/reviews")
public class ReviewController {
	@Autowired
	private ReviewService rService;
	
	 @Autowired
	 private SimpMessagingTemplate messagingTemplate;
	
	 @PostMapping("/{platId}/{userId}")
	 public ReviewModel addReview(@PathVariable Long platId, @PathVariable Long userId, @RequestBody ReviewModel review) {
	     ReviewModel savedReview = rService.addReview(platId, userId, review);

	     messagingTemplate.convertAndSend("/topic/reviews/" + platId, savedReview);

	     return savedReview;
	 }

	 @PutMapping("/{reviewId}")
	 public ReviewModel updateReview(@PathVariable Long reviewId, @RequestBody ReviewModel r) {
	     ReviewModel existingReview = rService.findReviewById(reviewId);

	     // Only update these fields
	     existingReview.setReview(r.getReview());
	     existingReview.setRating(r.getRating());
	     existingReview.setCreatedAt(r.getCreatedAt());

	     ReviewModel updatedReview = rService.saveReview(existingReview);

	     // Broadcast updated review
	     messagingTemplate.convertAndSend("/topic/reviews/" + updatedReview.getPlat().getId(), updatedReview);

	     return updatedReview;
	 }
	
	@GetMapping
	private List<ReviewModel> getAllReviews(){
		return rService.getAllReviews();
	}
	
	@DeleteMapping("/{reviewId}")
	private void deleteReviewById(@PathVariable Long reviewId) {
		rService.deleteReviewById(reviewId);
	}
	
}

package com.example.myRestaurent.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.myRestaurent.models.PlatModel;
import com.example.myRestaurent.models.ReviewModel;
import com.example.myRestaurent.models.UserModel;
import com.example.myRestaurent.repositories.PlatRepository;
import com.example.myRestaurent.repositories.ReviewRepository;
import com.example.myRestaurent.repositories.UserRepository;
import com.example.myRestaurent.services.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService {
	@Autowired
	private ReviewRepository rRepo;
	
	@Autowired
	private UserRepository uRepo;
	
	@Autowired
	private PlatRepository pRepo;
	
	@Override
	public ReviewModel addReview(Long platId, Long userId, ReviewModel review) {
	    UserModel user = uRepo.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    PlatModel plat = pRepo.findById(platId)
	            .orElseThrow(() -> new RuntimeException("Plat not found"));

	    review.setUser(user);
	    review.setPlat(plat);   

	    return rRepo.save(review);
	}

	@Override
	public ReviewModel findReviewById(Long reviewId) {
	    return rRepo.findById(reviewId)
	            .orElseThrow(() -> new RuntimeException("Review not found"));
	}

	public ReviewModel saveReview(ReviewModel review) {
	    return rRepo.save(review);
	}

	@Override
	public void deleteReviewById(Long id) {
		rRepo.deleteById(id);
	}
	
	@Override
	public List<ReviewModel> getAllReviews() {
		return rRepo.findAll();
	}
	
	

}

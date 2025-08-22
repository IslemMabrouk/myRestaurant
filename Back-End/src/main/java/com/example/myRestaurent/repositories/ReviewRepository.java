package com.example.myRestaurent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myRestaurent.models.ReviewModel;

public interface ReviewRepository extends  JpaRepository<ReviewModel, Long> {

}

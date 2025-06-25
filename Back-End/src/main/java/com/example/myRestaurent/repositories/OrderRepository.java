package com.example.myRestaurent.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myRestaurent.models.OrderModel;

public interface OrderRepository extends JpaRepository<OrderModel, Long> {
	List<OrderModel> findByUserId(Long userId);
	
	List<OrderModel> findByActiveTrue();
}

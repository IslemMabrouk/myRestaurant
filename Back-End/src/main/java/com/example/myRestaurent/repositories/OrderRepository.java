package com.example.myRestaurent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myRestaurent.models.OrderModel;

public interface OrderRepository extends JpaRepository<OrderModel, Long> {

}

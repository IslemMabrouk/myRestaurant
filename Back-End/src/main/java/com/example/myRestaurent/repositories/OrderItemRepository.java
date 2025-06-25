package com.example.myRestaurent.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myRestaurent.models.OrderItemModel;

public interface OrderItemRepository extends JpaRepository<OrderItemModel, Long>  {
    // You can add custom query methods if needed, for example:
    Optional<OrderItemModel> findById(Long id);
    
    // Or find all items by order id:
    List<OrderItemModel> findByOrderId(Long orderId);
}

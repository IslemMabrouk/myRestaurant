package com.example.myRestaurent.services;

import java.util.List;
import java.util.Optional;

import com.example.myRestaurent.models.OrderModel;

public interface OrderService {

    public OrderModel addOrder(OrderModel obj);
    
    public OrderModel save(OrderModel order);
	
	public OrderModel updateOrder(OrderModel obj);
	
	public List<OrderModel> getAllOrders();
	
	public List<OrderModel> getOrdersByUserId(Long userId);

	Optional<OrderModel> findById(Long id);
	public OrderModel findOrderById(Long id);
	
	public void deleteOrderById(Long id);
	
}

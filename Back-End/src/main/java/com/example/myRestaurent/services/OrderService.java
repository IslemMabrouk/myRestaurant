package com.example.myRestaurent.services;

import java.util.List;

import com.example.myRestaurent.models.OrderModel;

public interface OrderService {

public OrderModel addOrder(OrderModel obj);
	
	public OrderModel updateOrder(OrderModel obj);
	
	public List<OrderModel> getAllOrders();
	
	public OrderModel findOrderById(Long id);
	
	public void deleteOrderById(Long id);
	
}

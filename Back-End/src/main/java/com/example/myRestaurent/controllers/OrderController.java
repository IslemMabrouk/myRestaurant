package com.example.myRestaurent.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myRestaurent.models.OrderModel;
import com.example.myRestaurent.services.OrderService;

@RestController
@RequestMapping("api/orders")
public class OrderController {
	@Autowired
	private OrderService oService;
	
	@PostMapping
	private OrderModel addOrder(@RequestBody OrderModel o) {
		return oService.addOrder(o);
	}
	
	@PutMapping
	private OrderModel updateOrder(@RequestBody OrderModel o) {
		return oService.updateOrder(o);
	}

	@GetMapping
	private List<OrderModel> getAllOrders(){
		return oService.getAllOrders();
	}
	
	@GetMapping("/{id}")
	private OrderModel findOrderById(@PathVariable Long id) {
		return oService.findOrderById(id);
	}
	
	@DeleteMapping("/{id}")
	private void deleteOrderById(@PathVariable Long id) {
		oService.deleteOrderById(id);
	}

}

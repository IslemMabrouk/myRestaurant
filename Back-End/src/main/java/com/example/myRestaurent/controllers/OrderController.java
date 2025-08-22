package com.example.myRestaurent.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;


import com.example.myRestaurent.models.OrderModel;
import com.example.myRestaurent.services.OrderService;
import com.example.myRestaurent.servicesImpl.EmailServiceImpl;

@RestController
@RequestMapping("api/orders")
public class OrderController {
	@Autowired
	private OrderService oService;

	@Autowired
	private EmailServiceImpl emailService;

	
	@PostMapping
	public ResponseEntity<OrderModel> addOrder(@RequestBody OrderModel o) {
	    OrderModel savedOrder = oService.addOrder(o);
	    return ResponseEntity.ok(savedOrder);
	}


	
	@PutMapping
	private OrderModel updateOrder(@RequestBody OrderModel o) {
		return oService.updateOrder(o);
	}
	
	@PutMapping("/{id}/status")
	public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
	    String newStatus = body.get("status");

	    Optional<OrderModel> optionalOrder = oService.findById(id);
	    if (optionalOrder.isPresent()) {
	        OrderModel order = optionalOrder.get();
	        order.setStatus(newStatus);
	        oService.save(order);

	        if ("completed".equalsIgnoreCase(newStatus)) {
	            String message = "Hello " + order.getUser().getFirstName() +
	                             ", your order #" + order.getId() + " is on its way!";

	            // Email notification
	            emailService.sendEmail(order.getUser().getEmail(),
	                                   "Order Completed",
	                                   message);
	        }

	        return ResponseEntity.ok(order);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
	    }
	}

	
	@GetMapping
	private List<OrderModel> getAllOrders(){
		return oService.getAllOrders();
	}
	
	@GetMapping("/{id}")
	private OrderModel findOrderById(@PathVariable Long id) {
		return oService.findOrderById(id);
	}
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<OrderModel>> getOrdersByUserId(@PathVariable Long userId) {
	    List<OrderModel> orders = oService.getOrdersByUserId(userId);
	    return ResponseEntity.ok(orders);
	}

	
	@DeleteMapping("/{id}")
	private void deleteOrderById(@PathVariable Long id) {
		oService.deleteOrderById(id);
	}

}

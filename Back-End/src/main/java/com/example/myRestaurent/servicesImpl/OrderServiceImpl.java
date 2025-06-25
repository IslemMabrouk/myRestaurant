package com.example.myRestaurent.servicesImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.myRestaurent.models.OrderItemModel;
import com.example.myRestaurent.models.OrderModel;
import com.example.myRestaurent.models.UserModel;
import com.example.myRestaurent.repositories.OrderRepository;
import com.example.myRestaurent.services.OrderService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderServiceImpl  implements OrderService {
	@Autowired
	private OrderRepository oRepo;
	
	@Override
	public OrderModel addOrder(OrderModel order) {
	    if (order.getItems() != null) {
	        for (OrderItemModel item : order.getItems()) {
	            item.setOrder(order);
	        }
	    }
	    return oRepo.save(order);
	}

	public OrderModel save(OrderModel order) {
        return oRepo.save(order);
    }
	
	@Override
	public OrderModel updateOrder(OrderModel obj) {
		
		return oRepo.save(obj);
	}
	
	@Override
	public List<OrderModel> getAllOrders() {
		return oRepo.findByActiveTrue();
	}
	
	@Override
	public Optional<OrderModel> findById(Long id) {
	    return oRepo.findById(id);
	}

	@Override
	public OrderModel findOrderById(Long id) {

		Optional<OrderModel> u = oRepo.findById(id);
		return u.isPresent() ? u.get() : null;
	}
	
	public List<OrderModel> getOrdersByUserId(Long userId) {
	    return oRepo.findByUserId(userId);
	}

	
	@Override
	public void deleteOrderById(Long id) {
	    OrderModel order = oRepo.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("User not found with id " + id));
	    
	    order.setActive(false);
	    oRepo.save(order);
	}
}

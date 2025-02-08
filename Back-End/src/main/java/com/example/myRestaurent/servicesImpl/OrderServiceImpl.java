package com.example.myRestaurent.servicesImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.myRestaurent.models.OrderModel;
import com.example.myRestaurent.repositories.OrderRepository;
import com.example.myRestaurent.services.OrderService;

@Service
public class OrderServiceImpl  implements OrderService {
	@Autowired
	private OrderRepository oRepo;
	
	@Override
	public OrderModel addOrder(OrderModel obj) {
		
		return oRepo.save(obj);
	}
	
	@Override
	public OrderModel updateOrder(OrderModel obj) {
		
		return oRepo.save(obj);
	}
	
	@Override
	public List<OrderModel> getAllOrders() {
		
		return oRepo.findAll();
	}

	@Override
	public OrderModel findOrderById(Long id) {
		
		Optional<OrderModel> o = oRepo.findById(id);
		return o.isPresent() ? o.get():null;
	}
	
	@Override
	public void deleteOrderById(Long id) {
		
		oRepo.deleteById(id);
	}

}

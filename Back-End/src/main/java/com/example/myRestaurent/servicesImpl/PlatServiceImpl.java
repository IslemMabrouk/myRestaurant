package com.example.myRestaurent.servicesImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.myRestaurent.models.OrderItemModel;
import com.example.myRestaurent.models.PlatModel;
import com.example.myRestaurent.models.UserModel;
import com.example.myRestaurent.repositories.OrderItemRepository;
import com.example.myRestaurent.repositories.PlatRepository;
import com.example.myRestaurent.services.PlatService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class PlatServiceImpl implements PlatService {
	@Autowired
	private PlatRepository pRepo;
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Override
	public PlatModel addPlat(PlatModel obj) {
		
		return pRepo.save(obj);
	}
	
	@Override
	public PlatModel updatePlat(Long id,PlatModel obj) {
		PlatModel existingPlat = pRepo.findById(id).orElseThrow();

        // Replace the entire resource
		existingPlat.setName(obj.getName());
		existingPlat.setPrice(obj.getPrice());
		existingPlat.setCategory(obj.getCategory());
		existingPlat.setDescription(obj.getDescription());
        // Add other fields as necessary
		return pRepo.save(obj);
	}
	
	@Override
	public List<PlatModel> getAllPlats() {
		return pRepo.findByActiveTrue();
	}

	@Override
	public PlatModel findPlatById(Long id) {
		
		Optional<PlatModel> t = pRepo.findById(id);
		return t.isPresent() ? t.get():null;
	}
	
	@Override
	public void deletePlatById(Long id) {
		PlatModel plat = pRepo.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("Plat not found with id " + id));
	    
		plat.setActive(false);
	    pRepo.save(plat); // Save the change (soft delete)
	}

}

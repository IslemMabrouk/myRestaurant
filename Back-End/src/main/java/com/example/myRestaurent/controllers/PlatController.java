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

import com.example.myRestaurent.models.PlatModel;
import com.example.myRestaurent.services.PlatService;

@RestController
@RequestMapping("api/plats")
public class PlatController {
	@Autowired
	private PlatService pService;
	
	@PostMapping
	private PlatModel addPlat(@RequestBody PlatModel p) {
		return pService.addPlat(p);
	}
	
	@PutMapping("/{id}")
	private PlatModel updatePlat(@PathVariable Long id,@RequestBody PlatModel p) {
		return pService.updatePlat(id,p);
	}

	@GetMapping
	private List<PlatModel> getAllPlats(){
		return pService.getAllPlats();
	}
	
	@GetMapping("/{id}")
	private PlatModel findPlatById(@PathVariable Long id) {
		return pService.findPlatById(id);
	}
	
	@DeleteMapping("/{id}")
	private void deletePlatById(@PathVariable Long id) {
		pService.deletePlatById(id);
	}

}

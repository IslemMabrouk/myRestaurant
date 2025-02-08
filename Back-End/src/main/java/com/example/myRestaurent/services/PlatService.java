package com.example.myRestaurent.services;

import java.util.List;

import com.example.myRestaurent.models.PlatModel;

public interface PlatService {

	public PlatModel addPlat(PlatModel obj);
	
	public PlatModel updatePlat(Long id, PlatModel obj);
	
	public List<PlatModel> getAllPlats();
	
	public PlatModel findPlatById(Long id);
	
	public void deletePlatById(Long id);
	
}

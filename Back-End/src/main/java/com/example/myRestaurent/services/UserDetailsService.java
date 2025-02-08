package com.example.myRestaurent.services;

import org.springframework.security.core.userdetails.UserDetails;

import com.example.myRestaurent.models.UserModel;

public interface UserDetailsService {

	public UserDetails  loadUserByUsername(String email);
	
}

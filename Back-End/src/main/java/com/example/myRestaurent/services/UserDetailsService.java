package com.example.myRestaurent.services;

import org.springframework.security.core.userdetails.UserDetails;

public interface UserDetailsService {

	public UserDetails  loadUserByUsername(String email);
	
}

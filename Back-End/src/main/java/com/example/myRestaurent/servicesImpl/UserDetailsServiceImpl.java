package com.example.myRestaurent.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.myRestaurent.models.UserModel;
import com.example.myRestaurent.repositories.UserRepository;
import java.util.Collections;
import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	    UserModel user = userRepository.findUserByEmail(email);
	    if (user == null) {
	        throw new UsernameNotFoundException("User not found with email: " + email);
	    }
	    if (user.getPwd() == null || user.getPwd().isEmpty()) {
	        throw new IllegalArgumentException("Password cannot be null or empty for user: " + email);
	    }
	    return org.springframework.security.core.userdetails.User
	            .withUsername(email)
	            .password(user.getPwd())
	            .authorities(Collections.emptyList()) // ou les rôles de l'utilisateur
	            .build();
	}

}

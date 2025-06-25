package com.example.myRestaurent.servicesImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.myRestaurent.models.UserModel;
import com.example.myRestaurent.repositories.UserRepository;
import com.example.myRestaurent.services.UserService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository uRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserModel signUp(UserModel user) {
		// crypt password
		String encodedPassword = passwordEncoder.encode(user.getPwd());
		user.setPwd(encodedPassword);
		return uRepo.save(user);
	}

	@Override
	public UserModel updateUser(Long id, UserModel obj) {
	    Optional<UserModel> optionalUser = uRepo.findById(id);
	    if (!optionalUser.isPresent()) {
	        return null;
	    }

	    UserModel existingUser = optionalUser.get();

	    if (obj.getFirstName() != null) existingUser.setFirstName(obj.getFirstName());
	    if (obj.getLastName() != null) existingUser.setLastName(obj.getLastName());
	    if (obj.getEmail() != null) existingUser.setEmail(obj.getEmail());
	    if (obj.getAddress() != null) existingUser.setAddress(obj.getAddress());
	    if (obj.getPhone() != null) existingUser.setPhone(obj.getPhone());

	    if (obj.getPwd() != null && !obj.getPwd().isBlank()) {
	        existingUser.setPwd(passwordEncoder.encode(obj.getPwd()));
	    }

	    if (obj.getRoles() != null && !obj.getRoles().isEmpty()) {
	        existingUser.setRoles(obj.getRoles());
	    }

	    return uRepo.save(existingUser);
	}


	@Override
	public List<UserModel> getAllUsers() {
	    return uRepo.findByActiveTrue();
	}


	@Override
	public UserModel getUserById(Long id) {

		Optional<UserModel> u = uRepo.findById(id);
		return u.isPresent() ? u.get() : null;
	}

	@Override
	public UserModel getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return uRepo.findUserByEmail(email);
	}

	@Transactional
	@Override
	public void deleteUserById(Long id) {
	    UserModel user = uRepo.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("User not found with id " + id));
	    
	    user.setActive(false);
	    uRepo.save(user);
	}


}

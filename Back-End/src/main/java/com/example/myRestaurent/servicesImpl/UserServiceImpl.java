package com.example.myRestaurent.servicesImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.myRestaurent.models.UserModel;
import com.example.myRestaurent.repositories.UserRepository;
import com.example.myRestaurent.services.UserService;


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
	 public UserModel updateUser(Long id, UserModel user) {
		
		 UserModel existingUser = uRepo.findById(id).orElseThrow();

        // Replace the entire resource
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPwd(user.getPwd());
        existingUser.setPhone(user.getPhone());
        existingUser.setAddress(user.getAddress());
        existingUser.setExperience(user.getExperience());
        
        return uRepo.save(existingUser);
    }
	
	@Override
	public List<UserModel> getAllUsers() {
		
		return uRepo.findAll();
	}

	@Override
	public UserModel getUserById(Long id) {
		
		Optional<UserModel> u = uRepo.findById(id);
		return u.isPresent() ? u.get():null;
	}
	
	@Override
	public UserModel getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return uRepo.findUserByEmail(email);
	}
	
	@Override
	public void deleteUserById(Long id) {
		
		uRepo.deleteById(id);
	}

}

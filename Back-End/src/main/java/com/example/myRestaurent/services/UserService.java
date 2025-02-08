package com.example.myRestaurent.services;

import java.util.List;

import com.example.myRestaurent.models.UserModel;

public interface UserService  {

	public UserModel signUp(UserModel obj);
	
	public UserModel updateUser(Long id,UserModel obj);
	
	public UserModel getUserByEmail(String email);
	
	public List<UserModel> getAllUsers();

	
	public UserModel getUserById(Long id);
	
	public void deleteUserById(Long id);
	
}

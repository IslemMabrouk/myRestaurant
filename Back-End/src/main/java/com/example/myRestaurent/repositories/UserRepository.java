package com.example.myRestaurent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.myRestaurent.models.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {
	
	@Query("SELECT u FROM UserModel u WHERE u.email = :email")
	 UserModel findUserByEmail(@Param("email") String email);

}
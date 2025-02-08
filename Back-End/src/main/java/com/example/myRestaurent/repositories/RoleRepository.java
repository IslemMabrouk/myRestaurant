package com.example.myRestaurent.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myRestaurent.models.RoleModel;

public interface RoleRepository extends JpaRepository<RoleModel, Long> {
	Optional<RoleModel> findByName(String name);
}

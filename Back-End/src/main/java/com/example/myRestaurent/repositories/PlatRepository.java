package com.example.myRestaurent.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myRestaurent.models.PlatModel;

public interface PlatRepository extends JpaRepository<PlatModel, Long>  {
	List<PlatModel> findByActiveTrue();
}

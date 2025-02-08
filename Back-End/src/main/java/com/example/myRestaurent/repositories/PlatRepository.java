package com.example.myRestaurent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myRestaurent.models.PlatModel;

public interface PlatRepository extends JpaRepository<PlatModel, Long>  {

}

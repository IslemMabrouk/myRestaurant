package com.example.myRestaurent.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "roles")
public class RoleModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ROLE_ID")
	private Long id;
	private String name;
	   // Many-to-many relationship with UserModel
	@ManyToMany(mappedBy = "roles")
	@JsonIgnore
    private List<UserModel> users; 
	
	public RoleModel() {
		
	}

	public RoleModel(Long id, String name, List<UserModel> users) {
		
		this.id = id;
		this.name = name;
		this.users = users;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<UserModel> getUsers() {
		return users;
	}

	public void setUsers(List<UserModel> users) {
		this.users = users;
	}

	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "RoleModel [id=" + id + ", name=" + name + ", users=" + users + "]";
	}



	
	

}

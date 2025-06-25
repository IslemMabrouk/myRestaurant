package com.example.myRestaurent.models;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "plats")
public class PlatModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PLAT_ID")
	private Long id;
	private String name;
	private String description;
	private String category;
	private int  price;
	@Column(nullable = false)
	private boolean active = true;
	
	@ManyToOne(cascade = CascadeType.ALL)
	 @JoinColumn(name = "user_id", referencedColumnName = "USER_ID")
	 private UserModel user;
	
	public PlatModel() {
		
	}

	public PlatModel(String name, String description,String category, int price, UserModel user) {
		super();
		this.name = name;
		this.description = description;
		this.category = category;
		this.price = price;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
	
	public boolean isActive() {
	    return active;
	}

	public void setActive(boolean active) {
	    this.active = active;
	}

	public UserModel getUser() {
		return user;
	}

	public void setUser(UserModel user) {
		this.user = user;
	}
	
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "PlatModel [id=" + id + ", name=" + name + ", description=" + description + ", category=" + category
				+ ", price=" + price + ", user=" + user + "]";
	}
	
	
}
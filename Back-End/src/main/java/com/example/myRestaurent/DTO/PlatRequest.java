package com.example.myRestaurent.DTO;

public class PlatRequest {

	public String name;
	public int price;
	public String category;
	public String description;
	public Long chefId;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getChefId() {
		return chefId;
	}
	public void setChefId(Long chefId) {
		this.chefId = chefId;
	}
	
	

}

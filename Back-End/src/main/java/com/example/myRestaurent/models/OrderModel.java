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
@Table(name = "orders")
public class OrderModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ORDER_ID")
	
	private Long id;
	private String status;
	private String orderDate;
	private int  price;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "USER_ID")
	private UserModel user;
	
	public OrderModel() {
		
	}
	

	public OrderModel(Long id, String status, String orderDate, int price, UserModel user) {		
		this.id = id;
		this.status = status;
		this.orderDate = orderDate;
		this.price = price;
		this.user = user;
	}


	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public UserModel getUser() {
		return user;
	}

	public void setUser(UserModel user) {
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "OrderModel [id=" + id + ", status=" + status + ", orderDate=" + orderDate + ", price=" + price
				+ ", user=" + user + "]";
	}
	
	
	
	

}

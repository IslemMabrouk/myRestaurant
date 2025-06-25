package com.example.myRestaurent.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_items")
public class OrderItemModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int quantity;
    private int price;

    @ManyToOne
    @JoinColumn(name = "plat_id")
    private PlatModel plat; // Assure-toi que tu as une entité PlatModel

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private OrderModel order;

    public OrderItemModel() {}

  

    public Long getId() {
        return id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public PlatModel getPlat() {
        return plat;
    }

    public void setPlat(PlatModel plat) {
        this.plat = plat;
    }

    public OrderModel getOrder() {
        return order;
    }

    public void setOrder(OrderModel order) {
        this.order = order;
    }
}

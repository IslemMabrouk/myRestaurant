package com.example.myRestaurent.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "reviews")
public class ReviewModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "REVIEW_ID")
    private Long id;

    private String review;
    private Long rating;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "USER_ID")
    private UserModel user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plat_id", referencedColumnName = "PLAT_ID")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "reviews"})
    private PlatModel plat;

    public ReviewModel() {}

    public ReviewModel(Long id, String review, Long rating, LocalDateTime createdAt, UserModel user, PlatModel plat) {
        this.id = id;
        this.review = review;
        this.rating = rating;
        this.createdAt = createdAt;
        this.user = user;
        this.plat = plat;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();  // auto set before insert
    }

    // ---- Getters & Setters ----
    public Long getId() {
        return id;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Long getRating() {
        return rating;
    }

    public void setRating(Long rating) {
        this.rating = rating;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public PlatModel getPlat() {
        return plat;
    }

    public void setPlat(PlatModel plat) {
        this.plat = plat;
    }

    @Override
    public String toString() {
        return "ReviewModel [id=" + id + ", review=" + review + ", rating=" + rating + 
               ", createdAt=" + createdAt + ", user=" + user + ", plat=" + plat + "]";
    }
}

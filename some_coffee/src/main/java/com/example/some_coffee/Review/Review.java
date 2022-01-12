package com.example.some_coffee.Review;

import com.example.some_coffee.Product.Product;
import com.example.some_coffee.User.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    private String reviewDate;
    private String comment;
    private double rate;


    @ManyToOne(fetch = FetchType.EAGER) // extra
    @JsonIgnoreProperties("reviews")  // extra
    Product product;
    @ManyToOne(fetch = FetchType.EAGER)
    User user;

    public Review(){

    }

    public Review(Long reviewId, String reviewDate, String comment, double rate) {
        this.reviewId = reviewId;
        this.reviewDate = reviewDate;
        this.comment = comment;
        this.rate = rate;
    }

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public String getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(String reviewDate) {
        this.reviewDate = reviewDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public void setProduct(Product product){
        this.product=product;
    }
    public Product getProduct(){return product;}
}

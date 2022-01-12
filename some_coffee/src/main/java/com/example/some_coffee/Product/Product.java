package com.example.some_coffee.Product;

import com.example.some_coffee.Review.Review;

import javax.persistence.*;
import java.util.List;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    private String name;
    private double price;
    private double cost;
    private String category;
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL) // when you delete a product all the comments will be deleted as well
    private List<Review>reviews; //extra

    public Product() {

    }

    public Product(Long productId, String name, double price, double cost, String category, List<Review> reviews) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.cost = cost;
        this.category = category;
        this.reviews = reviews;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}

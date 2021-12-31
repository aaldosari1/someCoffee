package com.example.some_coffee.Review;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*") //remember this
@RequestMapping(path = "review")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public List<Review> getReviews(){
        return reviewService.getReviews();
    }

    @PostMapping
    public Review addReview(@RequestBody Form form){
        return reviewService.addReview(form.getReview(),form.getProductId(), form.getUserId());
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable String id) {
        reviewService.deleteReview(id);
    }

    @PutMapping("/{id}")
    public void updateReview(@PathVariable String id, @RequestBody Review data) {
        reviewService.updateReview(id, data);
    }
}

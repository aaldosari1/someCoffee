import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import "./StarRating.css";

function StarRating(myId) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const getComment = (e) => {
    setComment(e.target.value);
    console.log(rating);
  };
  const getDate = () => {
    const yourDate = new Date();
    return yourDate.toISOString().split("T")[0];
  };

  const insertReview = () => {
    console.log(myId.myId);
    const data = {
      review: { reviewDate: getDate(), comment, rate: rating },
      productId: myId.myId,
      userId: 1,
    };
    axios
      .post("http://localhost:8080/review", data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={20}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <br />
      <label>
        <input
          placeholder="Write your review"
          onChange={getComment}
          className="reveiw-input"
        />
      </label>
      <br />
      <button onClick={insertReview} className="submitbtn">
        {" "}
        Submit review
      </button>
    </div>
  );
}

export default StarRating;

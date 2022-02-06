import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import "./StarRating.css";

function StarRating({ myId, fun }) {
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
  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
    };
  });

  const insertReview = () => {
    console.log(myId);
    fun();
    const data = {
      review: { reviewDate: getDate(), comment, rate: rating },
      productId: myId,
      userId: state.user.id,
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
      <div className="review-user">
        <FaUserCircle size={50} />
        <h5>{state.user.userName}</h5>
      </div>
      <br />
      <div className="input-star">
        <label>
          <input
            placeholder="Write your review"
            onChange={getComment}
            className="reveiw-input"
          />
        </label>
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
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  size={20}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
      </div>
      <br />
      <button onClick={insertReview} className="submitbtn">
        {" "}
        Submit review
      </button>
    </div>
  );
}

export default StarRating;

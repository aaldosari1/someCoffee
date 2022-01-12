import "./MenuDetails.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import StarRating from "./StarRating";

import axios from "axios";

function MenuDetails() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [writeReview, setWriteReview] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const [reviews, setReviews] = useState([]);

  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
    };
  });

  const config = {
    headers: { Authorization: `Bearer ${state.token}` },
  };

  const reviewField = () => {
    setWriteReview(!writeReview);
  };

  const reviewsToggle = () => {
    setShowReview(!showReview);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/`, config)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Product Id: {id}</h1>

      {products.map((product) => {
        let num = parseInt(id);
        let total = 0;
        let count = 0;
        if (num === product.productId) {
          return (
            <div key={product.productId}>
              <br />
              <h2> Item name: {product.name} </h2>
              <h2> Item price: {product.price} </h2>
              <h2> Item categery: {product.category} </h2>
              <h2> Item categery: {product.reviews.length} </h2>
              {product.reviews.map((el) => {
                total = el.rate + total;
                count += 1;
                if (product.reviews.length === count)
                  return (
                    <div>
                      {" "}
                      {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;

                        return (
                          <label>
                            <input
                              type="radio"
                              name="rating"
                              //  value={ratingValue}
                              //  onClick={() => setRating(ratingValue)}
                            />
                            <FaStar
                              className="star"
                              color={
                                ratingValue <=
                                Math.round(total / product.reviews.length)
                                  ? "#ffc107"
                                  : "#e4e5e9"
                              }
                              size={20}
                              //  onMouseEnter={() => setHover(ratingValue)}
                              // onMouseLeave={() => setHover(null)}
                            />
                          </label>
                        );
                      })}
                    </div>
                  );
              })}
              {writeReview ? (
                <>
                  <StarRating myId={product.productId} />
                  <br />
                  <button onClick={reviewField}>Cancel</button>
                </>
              ) : (
                <button onClick={reviewField}>Write review</button>
              )}
              {showReview ? (
                <>
                  <button onClick={reviewsToggle}>Cancel</button>

                  {product.reviews.map((e) => {
                    return (
                      <div>
                        <h3>{e.comment} </h3>
                        <div>
                          {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;

                            return (
                              <label>
                                <input
                                  type="radio"
                                  name="rating"
                                  // value={ratingValue}
                                  //  onClick={() => setRating(ratingValue)}
                                />
                                <FaStar
                                  className="star"
                                  color={
                                    ratingValue <= e.rate
                                      ? "#ffc107"
                                      : "#e4e5e9"
                                  }
                                  size={20}
                                  //  onMouseEnter={() => setHover(ratingValue)}
                                  // onMouseLeave={() => setHover(null)}
                                />
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <button onClick={reviewsToggle}>show review</button>
              )}{" "}
            </div>
          );
        }
      })}
    </div>
  );
}

export default MenuDetails;

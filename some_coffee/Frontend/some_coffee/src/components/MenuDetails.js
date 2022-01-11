import "./MenuDetails.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StarRating from "./StarRating";
import axios from "axios";

function MenuDetails() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [writeReview, setWriteReview] = useState(false);
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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/`, config)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/review`)
      .then((res) => {
        setReviews(res.data);
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
        if (num === product.productId) {
          return (
            <div key={product.productId}>
              <br />
              <h2> Item name: {product.name} </h2>
              <h2> Item price: {product.price} </h2>
              <h2> Item categery: {product.category} </h2>
              {writeReview ? (
                <>
                  <StarRating myId={product.productId} />
                  <br />
                  <button onClick={reviewField}>Cancel</button>
                </>
              ) : (
                <button onClick={reviewField}>Write review</button>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}

export default MenuDetails;

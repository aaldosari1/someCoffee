import "./MenuDetails.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import StarRating from "./StarRating";
import NavBar from "./NavBar";
import axios from "axios";

function MenuDetails() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [test, setTest] = useState(true);
  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
      items: state.itemReducer.items,
      isLogedIn: state.userReducer.isLogedIn,
    };
  });

  const testFun = () => {
    setTest(true);
  };
  console.log(state.items);
  const config = {
    headers: { Authorization: `Bearer ${state.token}` },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/`)
      .then((res) => {
        setProducts(res.data);
        setTest(false);
        console.log(test);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [test]);

  return (
    <div>
      <div className="menuDetails-nav">
        <NavBar />
      </div>
      <br /> <br />
      {state.items.map((element) => {
        if (element.id == id) {
          return (
            <div className="MenuDetails-img">
              <img src={element.img} />
              <div className="menu-info">
                <h1 className="MenuDetails-name">{element.name}</h1>
                <h4 className="MenuDetails-caloris"> 200 caloris</h4>
              </div>
            </div>
          );
        }
      })}
      {products.map((product) => {
        let num = parseInt(id);
        let total = 0;
        let count = 0;
        if (num === product.productId) {
          return (
            <div className="details-main" key={product.productId}>
              <br />
              <div className="details-reviews-container">
                <div className="item-details">
                  <h3> Details: </h3>
                  <div className="inner-text">
                    <h4>name: </h4>
                    <h5> {product.name} </h5>
                    <h4>price: </h4>
                    <h5> ${product.price} </h5>
                    <h4>categery: </h4>
                    <h5> {product.category} </h5>
                  </div>
                  {product.reviews.map((el) => {
                    total = el.rate + total;
                    console.log("total:" + total);
                    count += 1;
                    if (product.reviews.length === count)
                      return (
                        <div>
                          {" "}
                          {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;

                            return (
                              <label>
                                <input type="radio" name="rating" />
                                <FaStar
                                  className="star"
                                  color={
                                    ratingValue <=
                                    Math.round(total / product.reviews.length)
                                      ? "#ffc107"
                                      : "#e4e5e9"
                                  }
                                  size={20}
                                />
                              </label>
                            );
                          })}
                        </div>
                      );
                  })}
                </div>
                {state.isLogedIn ? (
                  <div className="review-star">
                    <StarRating myId={product.productId} fun={testFun} />
                    <br />
                  </div>
                ) : (
                  <>
                    <h4>To write a review you need to sign in !</h4>
                  </>
                )}
              </div>
              {true ? (
                <>
                  {product.reviews.map((e) => {
                    return (
                      <div className="comment-card">
                        <div className="comment-header">
                          <div className="left-side">
                            <h6> {e.user.name}</h6>
                            {[...Array(5)].map((star, i) => {
                              const ratingValue = i + 1;

                              return (
                                <label>
                                  <input type="radio" name="rating" />
                                  <FaStar
                                    className="star"
                                    color={
                                      ratingValue <= e.rate
                                        ? "#ffc107"
                                        : "#e4e5e9"
                                    }
                                    size={20}
                                  />
                                </label>
                              );
                            })}
                          </div>
                          <div className="comment-date">
                            <h6> {e.reviewDate}</h6>
                          </div>
                        </div>

                        <p>{e.comment}</p>
                      </div>
                    );
                  })}
                </>
              ) : (
                <></>
              )}{" "}
            </div>
          );
        }
      })}
    </div>
  );
}

export default MenuDetails;

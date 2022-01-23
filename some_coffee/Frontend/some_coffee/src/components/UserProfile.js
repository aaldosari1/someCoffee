import "./UserProfile.css";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import axios from "axios";

function UserProfile() {
  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
    };
  });

  const [user, setUser] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [boolean1, setBoolean1] = useState(false);
  const [boolean2, setBoolean2] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${state.user.id}`)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showReviews = () => {
    setBoolean1(true);
    setBoolean2(false);
  };

  const showReservations = () => {
    setBoolean1(false);
    setBoolean2(true);
  };

  const hide = () => {
    setBoolean1(false);
    setBoolean2(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/review`)
      .then((res) => {
        setReviews(res.data);

        console.log(reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/reservation`)
      .then((res) => {
        setReservations(res.data);

        console.log(reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>User profile</h1>
      <hr />
      <div className="profile">
        <div className="List">
          <ul>
            <FaUserCircle size={60} />
            <li>
              <h4>{state.user.userName}</h4>
            </li>
            <li>
              <a href="#Profile" onClick={hide}>
                Profile
              </a>
            </li>
            <li>
              <a href="#Reviews" onClick={showReviews}>
                Reviews
              </a>
            </li>
            <li>
              <a href="#Reviews" onClick={showReservations}>
                Reservations
              </a>
            </li>
          </ul>
        </div>

        <div className="user-profile">
          <label for="Name" className="user-data">
            <h6>Name:</h6>
            <div className="data-div">
              <p name="name">{user.name}</p>
              <FaEdit />
            </div>
            <h6>User Name:</h6>
            <div className="data-div">
              <p name="name">{user.userName}</p>
              <FaEdit />
            </div>
            <h6>Phone Number: </h6>
            <div className="data-div">
              <p name="phone">{user.phone}</p>
              <FaEdit />
            </div>
            <h6>Email: </h6>
            <div className="data-div">
              <p name="email">{user.email}</p>
              <FaEdit />
            </div>
          </label>

          <hr />
        </div>
      </div>
      {boolean1 ? (
        <div>
          {reviews.map((element) => {
            if (element.user.userId == state.user.id) {
              return (
                <div className="user-reviews">
                  <div className="profile-comment-header">
                    <div className="left-side">
                      <h6>{element.user.name}</h6>
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
                                ratingValue <= element.rate
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
                    <h6 className="comment-date">{element.reviewDate}</h6>
                  </div>
                  <p>{element.comment}</p>
                </div>
              );
            }
          })}
        </div>
      ) : boolean2 ? (
        <div>
          {reservations.map((element) => {
            if (element.user.userId == state.user.id) {
              return (
                <div className="user's-reviews">
                  <p>Reservation ID:{" " + element.reservationId}</p>
                  <p>Reservation Date:{" " + element.reservationDate}</p>
                  <p>Reservation Time:{" " + element.reservationTime}</p>
                  <p>Table Size:{" " + element.coffeeTable.tableSize}</p>
                  <p>Reserved for:{" " + element.user.name}</p>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UserProfile;

import "./UserProfile.css";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
  const [editName, setEditName] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edit1, setEdit1] = useState(true);
  const [edit2, setEdit2] = useState(true);
  const [edit3, setEdit3] = useState(true);
  const [edit4, setEdit4] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${state.user.id}`)
      .then((res) => {
        setUser(res.data);
        setEditName(res.data.name);
        setEditUserName(res.data.userName);
        setEditPhone(res.data.phone);
        setEditEmail(res.data.email);
        setPassword(res.data.password);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getName = (e) => {
    setEditName(e.target.value);
  };

  const getUserName = (e) => {
    setEditUserName(e.target.value);
  };

  const getPhone = (e) => {
    setEditPhone(e.target.value);
  };
  const getEmail = (e) => {
    setEditEmail(e.target.value);
  };

  const update = () => {
    const data = {
      name: editName,
      userName: editUserName,
      password: password,
      phone: editPhone,
      email: editEmail,
    };

    if (edit1 === false) {
      setEdit1(true);
    }
    if (edit2 === false) {
      setEdit2(true);
    }
    if (edit3 === false) {
      setEdit3(true);
    }
    if (edit4 === false) {
      setEdit4(true);
    }

    axios
      .put(`http://localhost:8080/user/${state.user.id}`, data)
      .then((res) => {
        console.log(res.data);
        axios
          .get(`http://localhost:8080/user/${state.user.id}`)
          .then((res) => {
            setUser(res.data);
            setEditName(res.data.name);
            setEditUserName(res.data.userName);
            setEditPhone(res.data.phone);
            setEditEmail(res.data.email);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  const toggle1 = () => {
    if (edit1) setEdit1(!edit1);
  };
  const toggle2 = () => {
    if (edit2) setEdit2(!edit2);
  };
  const toggle3 = () => {
    if (edit3) setEdit3(!edit3);
  };
  const toggle4 = () => {
    if (edit4) setEdit4(!edit4);
  };

  const deleteFunction = (e) => {
    console.log(e.target.value);
    axios
      .delete(`http://localhost:8080/reservation/${e.target.value}`)
      .then((res) => {
        axios
          .get(`http://localhost:8080/reservation`)
          .then((res) => {
            setReservations(res.data);

            console.log(reviews);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
      <div className="profile-top">
        <button
          className="backbtn"
          onClick={() => {
            navigate(-1);
          }}
        >
          back
        </button>
        <h1>User profile</h1>
      </div>
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
        <div className="user-profile-container">
          <div className="user-profile">
            <label for="Name" className="user-data">
              <h6>Name:</h6>
              <div className="data-div">
                {edit1 ? (
                  <p name="name">{user.name}</p>
                ) : (
                  <input
                    className="profile-input"
                    defaultValue={user.name}
                    onChange={getName}
                  />
                )}
                <div className="edit">
                  <FaEdit onClick={toggle1} />
                </div>
              </div>
              <h6>User Name:</h6>
              <div className="data-div">
                {edit2 ? (
                  <p name="name">{user.userName}</p>
                ) : (
                  <input
                    className="profile-input"
                    defaultValue={user.userName}
                    onChange={getUserName}
                  />
                )}

                <div className="edit">
                  <FaEdit onClick={toggle2} />
                </div>
              </div>
              <h6>Phone Number: </h6>
              <div className="data-div">
                {edit3 ? (
                  <p name="phone">{user.phone}</p>
                ) : (
                  <input
                    className="profile-input"
                    defaultValue={user.phone}
                    onChange={getPhone}
                  />
                )}

                <div className="edit">
                  <FaEdit onClick={toggle3} />
                </div>
              </div>
              <h6>Email: </h6>
              <div className="data-div">
                {edit4 ? (
                  <p name="name">{user.email}</p>
                ) : (
                  <input
                    className="profile-input"
                    defaultValue={user.email}
                    onChange={getEmail}
                  />
                )}
                <div className="edit">
                  <FaEdit onClick={toggle4} />
                </div>
              </div>
            </label>

            <hr />
          </div>
        </div>
        <div className="btnDiv">
          {!edit1 || !edit2 || !edit3 || !edit4 ? (
            <button className="savebtn" onClick={update}>
              Save
            </button>
          ) : (
            <></>
          )}
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
                            <input type="radio" name="rating" />
                            <FaStar
                              className="star"
                              color={
                                ratingValue <= element.rate
                                  ? "#ffc107"
                                  : "#e4e5e9"
                              }
                              size={20}
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
        <div className="user-res-container">
          {reservations.map((element) => {
            if (element.user.userId == state.user.id) {
              return (
                <div>
                  <div className="user-res">
                    <p>Reservation ID:{" " + element.reservationId}</p>
                    <p>Reservation Date:{" " + element.reservationDate}</p>
                    <p>Reservation Time:{" " + element.reservationTime}</p>
                    <p>Table Num:{" " + element.coffeeTable.tableId}</p>
                    <p>Table Size:{" " + element.coffeeTable.tableSize}</p>
                    <button
                      className="resbtn"
                      value={element.reservationId}
                      onClick={deleteFunction}
                    >
                      {" "}
                      Delete
                    </button>
                  </div>
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

import background from "../img/coffee-cup.jpg";
import { FacaretLeft } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Reservation.css";
import { useSelector } from "react-redux";

function Reservation() {
  const yourDate = new Date();

  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      isLogedIn: state.userReducer.isLogedIn,
    };
  });

  const [tableId, setTableId] = useState(null);
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);
  const [time, setTime] = useState("4 PM");
  const [resDis, setResDis] = useState([false, false, false]);
  const [date, setDate] = useState(yourDate.toISOString().split("T")[0]);
  const [reservation, setReservation] = useState([]);
  const navigate = useNavigate();
  const [table, setTable] = useState(false);

  const getTime = (e) => {
    setTime(e.target.value);
    setResDis([false, false, false]);
  };

  const getDate = (e) => {
    setDate(e.target.value);
    setResDis([false, false, false]);
  };

  const toggle = (e) => {
    console.log(e.target.value);
    setTableId(e.target.value);
    setTable(!table);
    if (rating == null) setRating(e.target.value);
    else setRating(null);
  };

  const insertReservation = () => {
    if (table) {
      const data = {
        reservation: { reservationDate: date, reservationTime: time },
        tableId: tableId,
        userId: 1,
      };
      axios
        .post("http://localhost:8080/reservation", data)
        .then((res) => {
          let list = [reservation + data];
          setReservation(list);
          console.log(reservation);
          navigate("/ReservationConfirm");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please select a table", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/reservation`)
      .then((res) => {
        setReservation(res.data);
        console.log("updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showReservations = () => {
    const copy = resDis.slice();
    for (let i = 0; i < reservation.length; i++) {
      if (
        time === reservation[i].reservationTime &&
        date === reservation[i].reservationDate
      ) {
        for (let j = 1; j <= 3; j++) {
          if (reservation[i].coffeeTable.tableId === 1) {
            copy.splice(0, 1, true);
            setResDis(copy);
          }
          if (reservation[i].coffeeTable.tableId === 2) {
            copy.splice(1, 1, true);
            console.log("copy2: " + copy);
            setResDis(copy);
          }
          if (reservation[i].coffeeTable.tableId === 3) {
            console.log("copy3 befor : " + copy);
            copy.splice(2, 1, true);
            console.log("copy3 after: " + copy);
            setResDis(copy);
          }
        }
      }
    }
  };

  useEffect(() => {
    showReservations();
  }, [time, date]);

  console.log(resDis);

  return (
    <div className="Reservation">
      <br /> <br />
      {state.isLogedIn ? (
        <>
          <label className="date-label" htmlFor="fromDate">
            Select a date:{" "}
          </label>
          <input
            className="my-input"
            onChange={getDate}
            id="fromDate"
            type="date"
          />
          <br /> <br />
          <div className="Drop-down-div">
            <label> Select Time </label>
            <select onChange={getTime}>
              <option value="4 PM"> 4 PM</option>
              <option value="5 PM"> 5 PM</option>
              <option value="6 PM"> 6 PM</option>
              <option value="7 PM"> 7 PM</option>
              <option value="8 PM"> 8 PM</option>
              <option value="9 PM"> 9 PM</option>
              <option value="10 PM"> 10 PM</option>
            </select>
          </div>
          <br /> <br /> <br />
          <div className="contaning-father">
            <div className="table-selection">
              <h2>Select Your Table </h2>
            </div>
            <div className="father">
              <div id="tables">
                {[...Array(9)].map((circle, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={toggle}
                      />
                      <FaCircle
                        className="circle"
                        color={
                          resDis[i] ||
                          ratingValue == hover ||
                          rating == ratingValue
                            ? "red"
                            : "#5881d4"
                        }
                        size={50}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />{" "}
                      <FaChair
                        className="circle"
                        color={
                          resDis[i] ||
                          ratingValue == hover ||
                          rating == ratingValue
                            ? "red"
                            : "#5881d4"
                        }
                        size={50}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                      <p className="num-of-seats">
                        seats: {ratingValue > 5 ? 3 : 4}{" "}
                      </p>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <ToastContainer />
          </div>
          <br /> <br /> <br /> <br />
          <br /> <br /> <br /> <br /> <br /> <br />
          <button onClick={insertReservation}> Confirm Reservation</button>
        </>
      ) : (
        <h2>You need to sign in to reserve a table</h2>
      )}
    </div>
  );
}

export default Reservation;

import { FaSquare } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import "./Reservation.css";

function Reservation() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const getTime = (e) => {
    setTime(e.target.value);
  };
  console.log(hover);

  const getDate = (e) => {
    setDate(e.target.value);
  };
  console.log(date);

  const insertReservation = () => {
    const data = {
      reservation: { reservationDate: date, reservationTime: time },
      tableId: rating,
      userId: 1,
    };
    axios
      .post("http://localhost:8080/reservation", data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
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
        </select>
      </div>
      <br /> <br /> <br />
      <div id="tables">
        {[...Array(5)].map((square, i) => {
          const ratingValue = i + 1;

          return (
            <label>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <FaSquare
                className="star"
                color={ratingValue === (hover || rating) ? "blue" : "#e4e5e9"}
                size={50}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <br /> <br />
      <button onClick={insertReservation}> Confirm Reservation</button>
    </div>
  );
}

export default Reservation;

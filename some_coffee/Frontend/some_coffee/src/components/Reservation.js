import { FaSquare } from "react-icons/fa";
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
  const [time, setTime] = useState("4 PM");
  const [date, setDate] = useState(yourDate.toISOString().split("T")[0]);
  const [reservation, setReservation] = useState([]);
  const navigate = useNavigate();
  const [table1, setTable1] = useState(false);
  const [table2, setTable2] = useState(false);
  const [table3, setTable3] = useState(false);
  const [flag1, setFlag1] = useState(true);
  const [flag2, setFlag2] = useState(true);
  const [flag3, setFlag3] = useState(true);

  const getTime = (e) => {
    setTime(e.target.value);
  };

  const getDate = (e) => {
    setDate(e.target.value);
  };

  const toggle1 = (e) => {
    console.log(table1);
    console.log(e.target.value);
    setTable1(!table1);
    setTableId(e.target.value);
    if (table3 || table2) {
      if (flag2) setTable2(false);
      if (flag3) setTable3(false);
    }
  };

  const toggle2 = (e) => {
    console.log(table2);
    console.log(e.target.value);
    setTableId(e.target.value);
    setTable2(!table2);
    if (table1 || table3) {
      if (flag1) setTable1(false);
      if (flag3) setTable3(false);
    }
  };

  const toggle3 = (e) => {
    console.log(table3);
    console.log(e.target.value);
    setTableId(e.target.value);
    setTable3(!table3);
    if (table1 || table2) {
      if (flag1) setTable1(false);
      if (flag2) setTable2(false);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/reservation`)
      .then((res) => {
        setReservation(res.data);

        setTable1(false);
        setTable2(false);
        setTable3(false);
        setFlag1(true);
        setFlag2(true);
        setFlag3(true);
        for (let i = 0; i < res.data.length; i++) {
          //console.log(res.data[1].coffeeTable.tableId);
          if (
            time === res.data[i].reservationTime &&
            date === res.data[i].reservationDate
          ) {
            for (let j = 1; j <= 3; j++) {
              if (res.data[i].coffeeTable.tableId === 1) {
                setTable1(true);
                setFlag1(false);
              }
              if (res.data[i].coffeeTable.tableId === 2) {
                setTable2(true);
                setFlag2(false);
              }
              if (res.data[i].coffeeTable.tableId === 3) {
                setTable3(true);
                setFlag3(false);
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [time, date]);

  const insertReservation = () => {
    if (table1 || table2 || table3) {
      const data = {
        reservation: { reservationDate: date, reservationTime: time },
        tableId: tableId,
        userId: 1,
      };
      axios
        .post("http://localhost:8080/reservation", data)
        .then((res) => {
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

  return (
    <div>
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
          <div id="tables">
            <label>
              <input id="invisible" defaultValue={1} onClick={toggle1} />
              <FaSquare
                className="star"
                color={table1 ? "blue" : "#e4e5e9"}
                size={50}
                onMouseEnter={() => setHover(1)}
                onMouseLeave={() => setHover(null)}
              />
            </label>

            <label>
              <input id="invisible" defaultValue={2} onClick={toggle2} />
              <FaSquare
                className="star"
                color={table2 ? "blue" : "#e4e5e9"}
                size={50}
                onMouseEnter={() => setHover(2)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
            <label>
              <input id="invisible" defaultValue={3} onClick={toggle3} />
              <FaSquare
                className="star"
                color={table3 ? "blue" : "#e4e5e9"}
                size={50}
                onMouseEnter={() => setHover(3)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          </div>
          <div>
            <ToastContainer />
          </div>
          <br /> <br />
          <button onClick={insertReservation}> Confirm Reservation</button>
        </>
      ) : (
        <h2>You need to sign in to reserve a table</h2>
      )}
    </div>
  );
}

export default Reservation;

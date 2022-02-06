import "./ReservationConfirm.css";
import { useNavigate } from "react-router-dom";
function ReservationConfirm() {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  return (
    <div className="res-conformation">
      <br /> <br /> <br /> <br />
      <div className="conformation-main">
        <h1> Reservation confirmed </h1>
        <h1> Enjoy ! </h1>
      </div>
      <button className="homebtn" onClick={toHome}>
        Return to Home
      </button>
    </div>
  );
}

export default ReservationConfirm;

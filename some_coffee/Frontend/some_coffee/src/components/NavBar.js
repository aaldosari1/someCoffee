import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <br />
      <div className="veryTop">
        <img src="Images/instagram-icon.png" id="instagram" />
        <img src="Images/Logo.png" id="logo" />
      </div>
      <div className="top">
        <li>
          <Link to="/SignIn">Sign in</Link>
          <Link to="/SignUp">Sign up</Link>
        </li>
      </div>

      <div className="topnav">
        <li>
          <Link className="active" to="/">
            Home
          </Link>
          <Link to="/Reservation">Reserve Table</Link>
          <Link to="/Menu">Menu</Link>
          <Link to="/Product">Products</Link>
          <Link to="/About">About</Link>
        </li>
      </div>
      <br />
    </div>
  );
}

export default NavBar;

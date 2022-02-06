import "./NavBar.css";
import { Link } from "react-router-dom";
import { removeUser } from "../reducers/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";

function NavBar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      isLogedIn: state.userReducer.isLogedIn,
    };
  });

  const signOut = () => {
    const action = removeUser();
    dispatch(action);
  };

  return (
    <div className="nav-main-container">
      <div className="veryTop">
        <div>
          <img src="Images/Logo1.png" id="logo" />
          <a
            className="media-icon"
            href={"https://www.instagram.com/somecoffee.sa/?hl=en"}
            target="_blank"
          >
            <img src="Images/instagram-icon2.jpg" id="instagram" />
          </a>
          <a
            className="location-icon"
            href={"https://maps.app.goo.gl/G2SEAtbSZYJk5L1b9"}
            target="_blank"
          >
            <FaMapMarkerAlt color={"black"} size={24} />
          </a>
        </div>
        <div className="top">
          <li>
            {state.isLogedIn ? (
              <div className="profile-name">
                <Link to="/UserProfile">{state.user.userName}</Link>
                <a onClick={signOut}>Logout</a>
              </div>
            ) : (
              <div className="sign">
                <Link to="/SignIn">Sign in</Link>
                <Link to="/SignUp">Sign up</Link>
              </div>
            )}
          </li>
        </div>
      </div>

      <div className="topnav">
        <li>
          <Link className="active" to="/">
            Home
          </Link>
          <Link to="/Reservation">Reserve Table</Link>
          <Link to="/Menu">Menu</Link>
          <Link to="/About">About</Link>
        </li>
      </div>
      <br />
    </div>
  );
}

export default NavBar;

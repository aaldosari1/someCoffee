import "./NavBar1.css";
import { Link } from "react-router-dom";
import { removeUser } from "../reducers/user/actions";
import { useDispatch, useSelector } from "react-redux"; //map-marker-alt
import { FaMapMarkerAlt } from "react-icons/fa";

function NavBar1() {
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
    <div>
      <div className="veryTop1">
        <img src="Images/Logo.png" id="logo1" />
        <a
          className="media-icon1"
          href={"https://www.instagram.com/somecoffee.sa/?hl=en"}
          target="_blank"
        >
          <img src="Images/instagram-icon.png" id="instagram1" />
        </a>

        <a
          className="location-icon1"
          href={"https://maps.app.goo.gl/G2SEAtbSZYJk5L1b9"}
          target="_blank"
        >
          <FaMapMarkerAlt color={"white"} size={23} />
        </a>
      </div>
      {/* <div className="topnav1">
          <li>
            <Link className="active" to="/">
              Home
            </Link>
            <Link to="/Reservation">Reserve Table</Link>
            <Link to="/Menu">Menu</Link>
            <Link to="/Product">Products</Link>
            <Link to="/About">About</Link>
          </li>
        </div> */}
      <div className="top1">
        <li>
          {state.isLogedIn ? (
            <div className="profile-name1">
              <Link to="/UserProfile">{state.user.userName}</Link>
              <a onClick={signOut}>Logout</a>
            </div>
          ) : (
            <div>
              <Link to="/SignUp">Sign up</Link>
              <Link to="/SignIn">Sign in</Link>
            </div>
          )}
        </li>
      </div>
    </div>
  );
}

export default NavBar1;

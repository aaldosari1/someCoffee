import "./NavBar.css";
import { Link } from "react-router-dom";
import { removeUser } from "../reducers/user/actions";
import { useDispatch, useSelector } from "react-redux";

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
    <div>
      <br />
      <div className="veryTop">
        <a
          className="media-icon"
          href={"https://www.instagram.com/somecoffee.sa/?hl=en"}
          target="_blank"
        >
          <img src="Images/instagram-icon.png" id="instagram" />
        </a>

        <img src="Images/Logo.png" id="logo" />
      </div>
      <div className="top">
        <li>
          <Link to="/SignUp">Sign up</Link>
          {state.isLogedIn ? (
            <>
              <div className="profile-name">
                <p className="user-first-name">{state.user.userName}</p>
                <p onClick={signOut}>Logout</p>
              </div>
            </>
          ) : (
            <Link to="/SignIn">Sign in</Link>
          )}
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

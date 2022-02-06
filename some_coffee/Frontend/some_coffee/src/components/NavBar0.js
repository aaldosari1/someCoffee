import "./NavBar0.css";
import { Link } from "react-router-dom";
import { removeUser } from "../reducers/user/actions";
import { useDispatch, useSelector } from "react-redux";

function NavBar0() {
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
    <div className="topnav0-main">
      <div className="topnav0">
        <li>
          <Link className="active" to="/">
            Home
          </Link>
          <Link to="/Reservation">Reserve Table</Link>
          <Link to="/Menu">Menu</Link>
          <Link to="/About">About</Link>
        </li>
      </div>
    </div>
  );
}

export default NavBar0;

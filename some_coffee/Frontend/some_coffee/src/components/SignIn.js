import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addUser, addToken } from "../reducers/user/actions";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./SignIn.css";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

function SignIn() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [pro, setPro] = useState("");
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
    };
  });

  const adddUser = () => {
    const data = {
      userName: userName,
      password: password,
    };

    axios
      .post("http://localhost:8080/signIn", data)
      .then((res) => {
        console.log(res.data);
        const token = res.data.access_token;
        const decoded = jwt_decode(token);
        console.log(decoded);
        // add to redux
        const user_action = addUser({
          id: decoded.id,
          userName: decoded.sub,
        });

        const token_action = addToken(token);
        dispatch(user_action);
        dispatch(token_action);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addPro = () => {
    const dataa = {
      name: pro,
    };

    const config = {
      headers: { Authorization: `Bearer ${state.token}` },
    };

    axios
      .post("http://localhost:8080/product", dataa, config)
      .then((res) => {
        console.log(config);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  const getUserName = (e) => {
    setUserName(e.target.value);
  };
  const getPro = (e) => {
    setPro(e.target.value);
  };

  const check = () => {
    for (let i = 0; i < users.length; i++) {
      if (userName === users[i].name) {
        console.log("user found");
        break;
      } else if (i === users.length - 1) {
        console.log("this user does not exist");
      }
    }
  };

  return (
    <div>
      <hr />
      {/* <div className="SignIn-container"> */}
      <div className="SignIn-content">
        <img
          className="SignIn-img"
          src="/Images/instagramCup.jpg"
          width="400"
          height="500"
        />

        <div className="container">
          <h2 className="Sing-in-h2">Sign in</h2>

          <input
            type="text"
            placeholder="Enter User Name"
            name=" user name"
            id="Sign in"
            onChange={getUserName}
            required
          />

          <input
            type="password"
            placeholder={"Enter Passwocrd"}
            name="psw"
            id="psw"
            onChange={getPassword}
            required
          />
          <hr />
          <button type="submit" className="registerbtn" onClick={adddUser}>
            Login
          </button>
          <p>
            By Siging in you agree to our <a href="#">Terms and Privacy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

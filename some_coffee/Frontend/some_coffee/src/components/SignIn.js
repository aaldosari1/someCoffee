import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addUser, addToken } from "../reducers/user/actions";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

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
      <h1>Sign In</h1>
      <hr />
      <label>
        <b>User Name</b>
      </label>
      <input
        id="entered_name"
        onChange={getUserName}
        type="text"
        placeholder="Enter User Name"
        name="name"
        required
      ></input>
      <br />
      <label htmlFor="psw">
        <b>Password</b>
      </label>
      <input
        type="password"
        onChange={getPassword}
        placeholder="Enter Password"
        name="psw"
        required
      ></input>
      <br />
      <button onClick={adddUser}>Log in</button>
    </div>
  );
}

export default SignIn;

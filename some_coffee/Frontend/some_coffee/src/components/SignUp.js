import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../reducers/user/actions";
import "./SignUp.css";

import axios from "axios";

function SignUp() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(15);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const insertUser = () => {
    const data = {
      user: { name, userName, password, age, phone, email },
      roleId: 1,
    };
    axios
      .post("http://localhost:8080/user", data)
      .then((res) => {
        const action = addUser(res.data);
        dispatch(action);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getName = (e) => {
    setName(e.target.value);
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  const getUserName = (e) => {
    setUserName(e.target.value);
  };

  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  const getPhone = (e) => {
    setPhone(e.target.value);
  };

  const getAge = (e) => {
    setAge(e.target.value);
  };

  const getConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const check = () => {
    if (password !== confirmPassword) console.log("pass word does not match");
  };

  return (
    <div>
      <hr />
      <div className="SignUp-content">
        <img className="SignUp-img" src="/Images/post.png" />
        <div className="container">
          <h2 className="Sing-up-h2">Sign Up</h2>
          <input
            type="text"
            onChange={getName}
            placeholder="Enter Name"
            name="name"
            required
          ></input>

          <input
            icon="users"
            type="text"
            onChange={getUserName}
            placeholder="Enter User Name"
            name="name"
            required
          ></input>
          <span className="fa fa-info-circle errspan"></span>
          <i className="icon-search icon-2x"></i>

          <input
            type="text"
            onChange={getEmail}
            placeholder="Enter Email"
            name="email"
            required
          ></input>

          <input
            type="text"
            onChange={getPhone}
            placeholder="Enter Phone No."
            name="phone"
            required
          ></input>
          {/* <br />
      <label htmlFor="age">
        <b>Age</b>
      </label>
      <input
        type="text"
        onChange={getAge}
        placeholder="Enter User Name"
        name="name"
        required
      ></input> */}

          <input
            type="password"
            onChange={getPassword}
            placeholder="Enter Password"
            name="psw"
            required
          ></input>

          <input
            type="password"
            onChange={getConfirmPassword}
            placeholder="Confirm Password"
            name="psw-repeat"
            required
          ></input>
          <hr />
          <button className="registerbtn " onClick={insertUser}>
            Let's do this
          </button>
        </div>
      </div>
    </div>
  );
}
export default SignUp;

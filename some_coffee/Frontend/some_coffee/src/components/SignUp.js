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
  const [age, setAge] = useState("");
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
      <p>Please fill in this form to create an account.</p>
      <hr />
      <label htmlFor="name">
        <b>Name</b>
      </label>
      <input
        type="text"
        onChange={getName}
        placeholder="Enter Name"
        name="name"
        required
      ></input>
      <br />
      <label htmlFor="user">
        <b>User Name</b>
      </label>
      <input
        type="text"
        onChange={getUserName}
        placeholder="Enter User Name"
        name="name"
        required
      ></input>
      <br />
      <label htmlFor="email">
        <b>Email</b>
      </label>
      <input
        type="text"
        onChange={getEmail}
        placeholder="Enter Email"
        name="email"
        required
      ></input>
      <br />
      <label htmlFor="phone">
        <b>Phone No.</b>
      </label>
      <input
        type="text"
        onChange={getPhone}
        placeholder="Enter User Name"
        name="name"
        required
      ></input>
      <br />
      <label htmlFor="age">
        <b>Age</b>
      </label>
      <input
        type="text"
        onChange={getAge}
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
      <label htmlFor="psw-repeat">
        <b>Confirm Password</b>
      </label>
      <input
        type="password"
        onChange={getConfirmPassword}
        placeholder="Repeat Password"
        name="psw-repeat"
        required
      ></input>
      <br />
      <button onClick={insertUser}>Sign up</button>
    </div>
  );
}
export default SignUp;

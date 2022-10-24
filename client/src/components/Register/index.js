import React from "react";
import Axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setIsLoggedIn, isLoggedIn, setCurrentUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [regNote, setRegNote] = useState("");

  const navToHome = useNavigate();

  const register = () => {
    if (email !== "" && firstName !== "" && lastName !== "" && username) {
      if (password === rePassword && password !== "" && rePassword !== "") {
        Axios.post("http://localhost:3001/register", {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password,
        }).then((response) => {
          if (!response.data.message) {
            Axios.post(`https://mmmbook-vertwo-server.herokuapp.com/login`, {
              loginEmail: email,
              loginPass: password,
            }).then((response) => {
              // console.log(response);
              setIsLoggedIn(true);
              setCurrentUser(response.data[0]);
              navToHome("/");
            });
          } else {
            setRegNote(response.data.message);
          }
        });
      } else {
        console.log("Passwords do not match");
        setRegNote("Passwords do not match");
      }
    } else {
      console.log("missing info");
      setRegNote("missing info");
    }

    // Axios.post("https://mmmbook-vertwo-server.herokuapp.com/register", {
    //   firstName: firstName,
    //   lastName: lastName,
    //   username: username,
    //   email: email,
    //   password: password,
    // }).then((response) => {
    //   Axios.post(`https://mmmbook-vertwo-server.herokuapp.com/login`, {
    //     loginEmail: email,
    //     loginPass: password,
    //   }).then((response) => {
    //     // console.log(response);
    //     setIsLoggedIn(true);
    //     setCurrentUser(response.data[0]);
    //     navToHome("/");
    //   });
    // });
  };

  return (
    <div className="registerPage">
      <div className="registerForm">
        <h2>Register</h2>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type={"password"}
        />
        <input
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          placeholder="Re-Type Password"
          type={"password"}
        />
        <button onClick={() => register()}>Register</button>
        <p>{regNote}</p>
        <p>Already have an account?</p>
        <Link to="/login">
          <p>Click here to login</p>
        </Link>
      </div>
    </div>
  );
};

export default Register;

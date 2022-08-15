import React from "react";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ setIsLoggedIn, isLoggedIn }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    Axios.post("https://mmmbook-vertwo-server.herokuapp.com/register", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <p>register</p>
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
      <button onClick={() => register()}>Register</button>
      <Link to="/login">
        <p>login</p>
      </Link>
    </div>
  );
};

export default Register;

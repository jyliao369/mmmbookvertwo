import React from "react";
import Axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, isLoggedIn, setCurrentUser }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [loginNote, setLoginNote] = useState("");

  const navToHome = useNavigate();

  const login = () => {
    Axios.post(`http://localhost:3001/login`, {
      loginEmail: loginEmail,
      loginPass: loginPass,
    }).then((response) => {
      if (response.data.message) {
        setLoginNote(response.data.message);
      } else {
        setIsLoggedIn(true);
        setCurrentUser(response.data[0]);
        navToHome("/");
      }
    });
  };

  const logout = () => {
    Axios.get("https://mmmbook-vertwo-server.herokuapp.com/logout", {}).then(
      (response) => {
        // console.log(response);
        setIsLoggedIn(false);
      }
    );
  };

  return (
    <div className="loginPage">
      <div className="loginForm">
        <h2>Login</h2>
        <input
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={loginPass}
          onChange={(e) => setLoginPass(e.target.value)}
          placeholder="Password"
          type={"password"}
        />
        {isLoggedIn === false ? (
          <button onClick={() => login()}>Login</button>
        ) : (
          <button onClick={() => logout()}>Logout</button>
        )}
        <p>{loginNote}</p>
        <p>Don't have an account?</p>
        <Link to="/register">
          <p>Click here to Register</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setIsLoggedIn, isLoggedIn }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const login = () => {
    Axios.post(`https://mmmbook-vertwo-server.herokuapp.com/login`, {
      loginEmail: loginEmail,
      loginPass: loginPass,
    }).then((response) => {
      // console.log(response);
      setIsLoggedIn(true);
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
    <div>
      <p>login</p>
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
      <Link to="/register">
        <p>reigster</p>
      </Link>
    </div>
  );
};

export default Login;

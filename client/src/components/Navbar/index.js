import React from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setIsLoggedIn, isLoggedIn, currentUser }) => {
  const navToHome = useNavigate();

  const logout = () => {
    Axios.get("https://mmmbook-vertwo-server.herokuapp.com/logout", {}).then(
      (response) => {
        // console.log(response);
        setIsLoggedIn(false);
        navToHome("/");
      }
    );
  };

  return (
    <div className="navBar">
      <h2>mmmbookver2</h2>
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/explore">
        <p>Explore</p>
      </Link>
      {isLoggedIn === false ? (
        <></>
      ) : (
        <>
          <Link to={`/userProfile/${currentUser.userID}`}>
            <p>My Profile</p>
          </Link>
          <p>Favorites</p>
          <Link to="/create">
            <p>Create</p>
          </Link>

          <p>Settings</p>
        </>
      )}
      {isLoggedIn === false ? (
        <Link to="/login">
          <p>Login</p>
        </Link>
      ) : (
        <p onClick={() => logout()} style={{ cursor: "pointer" }}>
          Logout
        </p>
      )}
    </div>
  );
};

export default Navbar;

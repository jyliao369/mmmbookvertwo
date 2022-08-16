import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  return (
    <div className="navBar">
      <h2>mmmbookver2</h2>
      <Link to="/">
        <p>home</p>
      </Link>
      <p>explore</p>
      {isLoggedIn === false ? (
        <></>
      ) : (
        <>
          <Link to="/profile">
            <p>profile</p>
          </Link>
          <p>favorites</p>
          <Link to="/create">
            <p>Create</p>
          </Link>

          <p>Settings</p>
        </>
      )}

      <Link to="/login">
        <p>Login</p>
      </Link>
    </div>
  );
};

export default Navbar;

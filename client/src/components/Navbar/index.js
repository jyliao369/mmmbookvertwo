import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navBar">
      <p>mmmbookver2</p>
      <Link to="/">
        <p>home</p>
      </Link>
      <p>explore</p>
      <Link to="/profile">
        <p>profile</p>
      </Link>
      <p>favorites</p>
      <p>Create</p>
      <p>Settings</p>
      <Link to="/login">
        <p>Login</p>
      </Link>
    </div>
  );
};

export default Navbar;

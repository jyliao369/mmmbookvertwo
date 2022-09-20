import React from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import HouseIcon from "@mui/icons-material/House";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import KitchenIcon from "@mui/icons-material/Kitchen";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

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
      <div className="navBarBtn">
        <Link to="/" className="homeButton">
          <HouseIcon />
          {/* <p>Home</p> */}
        </Link>
        <Link to="/explore" className="exploreButton">
          <SearchIcon />
          {/* <p>Explore</p> */}
        </Link>
        <Link to="/drinks" className="drinkButton">
          <LocalBarIcon />
          {/* <p>Drinks</p> */}
        </Link>
        <Link to="/dishes" className="entreeButton">
          <RestaurantIcon />
          {/* <p>Entree Only</p> */}
        </Link>
        {isLoggedIn === false ? (
          <></>
        ) : (
          <>
            <Link
              to={`/userProfile/${currentUser.userID}`}
              className="userButton"
            >
              <PersonIcon />
              {/* <p>My Profile</p> */}
            </Link>
            <Link to="/create" className="createButton">
              <KitchenIcon />
              {/* <p>Create</p> */}
            </Link>
          </>
        )}
        {isLoggedIn === false ? (
          <Link to="/login" className="loginButton">
            <LoginIcon />
            {/* <p>Login</p> */}
          </Link>
        ) : (
          <>
            <div className="logOutButton">
              <LogoutIcon
                onClick={() => logout()}
                style={{ cursor: "pointer" }}
              />
            </div>

            {/* <p onClick={() => logout()} style={{ cursor: "pointer" }}>
              Logout
            </p> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

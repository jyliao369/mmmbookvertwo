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
    <div className="navBar" id="navBar">
      <div className="navBarBtn" id="navBarBtn">
        <Link to="/" className="homeButton" id="homeButton">
          <HouseIcon />
          <p>Home</p>
        </Link>
        <Link to="/explore" className="exploreButton" id="exploreButton">
          <SearchIcon />
          <p>Search</p>
        </Link>
        <Link to="/drinks" className="drinkButton" id="drinkButton">
          <LocalBarIcon />
          <p>Drinks</p>
        </Link>
        <Link to="/dishes" className="entreeButton" id="entreeButton">
          <RestaurantIcon />
          <p>Entrees</p>
        </Link>
        {isLoggedIn === false ? (
          <></>
        ) : (
          <>
            <Link
              to={`/userProfile/${currentUser.userID}`}
              className="userButton"
              id="userButton"
            >
              <PersonIcon />
              <p>Profile</p>
            </Link>
            <Link to="/create" className="createButton" id="createButton">
              <KitchenIcon />
              <p>Create</p>
            </Link>
          </>
        )}
        {isLoggedIn === false ? (
          <Link to="/login" className="logInButton" id="logInButton">
            <LoginIcon />
            <p>login</p>
          </Link>
        ) : (
          <>
            <div className="logOutButton" id="logOutButton">
              <LogoutIcon
                onClick={() => logout()}
                style={{ cursor: "pointer" }}
              />
              <p>logout</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

const TitleBanner = () => {
  const expandNavBar = () => {
    if (
      document.getElementById("navBar").style.width === "" ||
      document.getElementById("navBar").style.width === "4rem"
    ) {
      document.getElementById("navBar").style.width = "14rem";

      document.getElementById("mainPage").style.marginLeft = "14rem";

      document.getElementById("homeButton").style.flexDirection = "row";
      document.getElementById("exploreButton").style.flexDirection = "row";
      document.getElementById("drinkButton").style.flexDirection = "row";
      document.getElementById("entreeButton").style.flexDirection = "row";
      //   document.getElementById("userButton").style.flexDirection = "row";
      //   document.getElementById("createButton").style.flexDirection = "row";
      document.getElementById("logInButton").style.flexDirection = "row";
      //   document.getElementById("logOutButton").style.flexDirection = "row";
    } else if (document.getElementById("navBar").style.width === "14rem") {
      document.getElementById("navBar").style.width = "4rem";

      document.getElementById("mainPage").style.marginLeft = "4rem";

      document.getElementById("homeButton").style.flexDirection = "column";
      document.getElementById("exploreButton").style.flexDirection = "column";
      document.getElementById("drinkButton").style.flexDirection = "column";
      document.getElementById("entreeButton").style.flexDirection = "column";
      //   document.getElementById("userButton").style.flexDirection = "column";
      //   document.getElementById("createButton").style.flexDirection = "column";
      document.getElementById("logInButton").style.flexDirection = "column";
      //   document.getElementById("logOutButton").style.flexDirection = "column";
    }
  };

  return (
    <div className="titleBanner">
      <div className="titleBannerCont">
        <div className="titleBannerOne">
          <MenuIcon
            onClick={(e) => expandNavBar()}
            style={{ cursor: "pointer" }}
          />
          <h2>mmm!!!Book</h2>
        </div>
        <div className="titleBannerTwo">
          <input placeholder="Search" />
          <SearchIcon />
        </div>
        <AccountCircleIcon />
      </div>
    </div>
  );
};

export default TitleBanner;

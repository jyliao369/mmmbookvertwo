import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";

const TitleBanner = ({
  isLoggedIn,
  searchWord,
  setSearchWord,
  setSearchedRecipes,
  setFoundRecipe,
}) => {
  const [isNavBarEx, setIsNavBarEx] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);
  const [searchedWord, setSearchedWord] = useState("");

  const navToSearch = useNavigate();

  const expandNavBar = () => {
    if (
      document.getElementById("navBar").style.width === "" ||
      document.getElementById("navBar").style.width === "4rem"
    ) {
      document.getElementById("navBar").style.width = "14rem";

      document.getElementById("mainPage").style.marginLeft = "14rem";

      // document.getElementById("homeButton").style.flexDirection = "row";
      // document.getElementById("exploreButton").style.flexDirection = "row";
      // document.getElementById("drinkButton").style.flexDirection = "row";
      // document.getElementById("entreeButton").style.flexDirection = "row";
      // document.getElementById("userButton").style.flexDirection = "row";
      // document.getElementById("createButton").style.flexDirection = "row";
      // document.getElementById("logInButton").style.flexDirection = "row";
      // document.getElementById("logOutButton").style.flexDirection = "row";
    } else if (document.getElementById("navBar").style.width === "14rem") {
      document.getElementById("navBar").style.width = "4rem";

      document.getElementById("mainPage").style.marginLeft = "4rem";

      // document.getElementById("homeButton").style.flexDirection = "column";
      // document.getElementById("exploreButton").style.flexDirection = "column";
      // document.getElementById("drinkButton").style.flexDirection = "column";
      // document.getElementById("entreeButton").style.flexDirection = "column";
      // document.getElementById("userButton").style.flexDirection = "column";
      // document.getElementById("createButton").style.flexDirection = "column";
      // document.getElementById("logInButton").style.flexDirection = "column";
      // document.getElementById("logOutButton").style.flexDirection = "column";
    }
  };

  const test = () => {
    if (isNavBarEx === false) {
      document
        .querySelector(":root")
        .style.setProperty("--navBarWidth", "10rem");
      document.getElementById("mainPage").style.marginLeft = "10rem";

      setIsNavBarEx(true);
    } else if (isNavBarEx === true) {
      document
        .querySelector(":root")
        .style.setProperty("--navBarWidth", "5rem");
      document.getElementById("mainPage").style.marginLeft = "5rem";

      setIsNavBarEx(false);
    }
  };

  const searchRecipe = () => {
    // console.log(searchWord);
    // console.log(allRecipes);

    let fileredRecipes = [];

    if (searchWord === "") {
      setFoundRecipe(false);
      setSearchedRecipes(allRecipes);
    } else {
      for (let a = 0; a < allRecipes.length; a++) {
        if (
          allRecipes[a].name.toLowerCase().includes(searchWord) ||
          allRecipes[a].ingredients.toLowerCase().includes(searchWord) ||
          allRecipes[a].description.toLowerCase().includes(searchWord)
        ) {
          fileredRecipes.push(allRecipes[a]);
        }
      }

      if (fileredRecipes.length > 0) {
        setFoundRecipe(true);
        setSearchedRecipes(fileredRecipes);
      } else {
        setFoundRecipe(false);
        setSearchedRecipes(allRecipes);
      }
    }

    navToSearch(`/search`);
  };

  useEffect(() => {
    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getAllRecipes`,
      {}
    ).then((response) => {
      // console.log("hello");
      // console.log(response.data);
      setAllRecipes(response.data.reverse());
    });
  }, []);

  return (
    <div className="titleBanner">
      <div className="titleBannerCont">
        <div className="titleBannerOne">
          <MenuIcon onClick={(e) => test()} style={{ cursor: "pointer" }} />
          <Link to={`/`}>
            <h2>mmm!!!Book</h2>
          </Link>
        </div>
        <div className="titleBannerTwo">
          <input
            value={searchWord}
            onChange={(event) => setSearchWord(event.target.value)}
            placeholder="Search"
          />
          <div style={{ cursor: "pointer" }} onClick={() => searchRecipe()}>
            <SearchIcon />
          </div>
        </div>

        {isLoggedIn === true ? <AccountCircleIcon /> : <LoginIcon />}
      </div>
    </div>
  );
};

export default TitleBanner;

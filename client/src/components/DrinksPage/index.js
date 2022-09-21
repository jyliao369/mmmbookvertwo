import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

const DrinksPage = ({ isLoggedIn, setCurrentUser, currentUser }) => {
  const [allDrinks, setAllDrinks] = useState([]);

  const flipSide = (event, recipeCard) => {
    event.preventDefault();

    if (
      document.getElementById(`${recipeCard}a`).style.display === "" ||
      document.getElementById(`${recipeCard}a`).style.display === "flex"
    ) {
      document.getElementById(`${recipeCard}a`).style.display = "none";
      document.getElementById(`${recipeCard}b`).style.display = "flex";
    } else if (
      document.getElementById(`${recipeCard}a`).style.display === "none"
    ) {
      document.getElementById(`${recipeCard}a`).style.display = "flex";
      document.getElementById(`${recipeCard}b`).style.display = "none";
    }
  };

  const instrSplit = (instr) => {
    // console.log(test.split("."));
    return instr.split(".");
  };

  const ingrSplit = (ingre) => {
    // console.log(ingre.split("\n"));
    return ingre.split("\n");
  };

  const addFavorite = (event, recipeID) => {
    event.preventDefault();

    Axios.post(`http://localhost:3001/createBookmark`, {
      userID: currentUser.userID,
      username: currentUser.username,
      recipeID: recipeID,
    }).then((response) => {
      console.log(response);
    });
  };

  const addLike = (event, recipeID) => {
    event.preventDefault();

    Axios.post(`http://localhost:3001/createLikes`, {
      userID: currentUser.userID,
      username: currentUser.username,
      recipeID: recipeID,
    }).then((response) => {
      console.log(response);
      Axios.get(`http://localhost:3001/getAllRecipes`, {}).then((response) => {
        // console.log(response.data);
        // setAllRecipes(response.data);
      });
    });
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/drinksOnly`, {}).then((response) => {
      console.log("ehllo");
      console.log(response);
      setAllDrinks(response.data.reverse());
    });
  }, []);

  return (
    <div className="drinksPage">
      <div className="pageBanner">
        <p>Drinks and Beverages</p>
      </div>
      <div className="onlyDrinksCont">
        {allDrinks.map((drink) => (
          <div key={drink.recipeID} className="recipeCard">
            <div className="recipeCardIn">
              <div className="recipeCardA" id={`recipeCard${drink.recipeID}a`}>
                <div className="recipeCardMainInfo">
                  <Link key={drink.recipeID} to={`/recipe/${drink.recipeID}`}>
                    <div className="recipeImage"></div>
                  </Link>
                  <div className="recipeInfo">
                    <div className="recipeInfoA">
                      <h3>{drink.name}</h3>
                      <p>Posted by: {drink.username} on "date"</p>
                      <p>Description: {drink.description.slice(0, 180)}</p>
                    </div>
                    <div className="recipeInfoB">
                      <div className="recipeInfoBA">
                        <p>Prep Time: {drink.prepTime} min</p>
                        <p>Cook Time: {drink.cookTime} min</p>
                        <p>Total Time: {drink.totalTime} min</p>
                        <p>Yield: {drink.yield}</p>
                        <p>Servings: {drink.servings}</p>
                      </div>
                      <div className="recipeInfoBA">
                        <p>Category: {drink.category}</p>
                        <p>Course: {drink.course}</p>
                        <p>Cuisine: {drink.cuisine}</p>
                        <p>Diet: {drink.diet}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="recipeCardB" id={`recipeCard${drink.recipeID}b`}>
                <div className="recipeCardIngIns">
                  <div className="recipeCardIng">
                    <h3>Ingredients</h3>
                    <div>
                      {ingrSplit(drink.ingredients).map((ingredient) => (
                        <p key={ingredient.slice(5, 100)}>{ingredient}</p>
                      ))}
                    </div>
                  </div>
                  <div className="recipeCardIns">
                    <h3>Instructions</h3>
                    <div>
                      {instrSplit(drink.instructions).map((instruction) => (
                        <p>{instruction}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="recipeCardAdd">
                  <h3>Additional Notes:</h3>
                  <p>{drink.addNotes}</p>
                </div>
              </div>
              <div className="recipeCardC">
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(event) =>
                    flipSide(event, `recipeCard${drink.recipeID}`)
                  }
                  className="seeInsIngBtn"
                >
                  <FeaturedPlayListOutlinedIcon />
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  className="chefProfileBtn"
                >
                  <Link to={`/profile/${drink.userID}`}>
                    <AccountBoxOutlinedIcon />
                  </Link>
                </button>

                {isLoggedIn === true ? (
                  <>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={(event) => addFavorite(event, drink.recipeID)}
                      className="bookmarkBtn"
                    >
                      <FavoriteBorderOutlinedIcon />
                    </button>

                    <button
                      style={{ cursor: "pointer" }}
                      onClick={(event) => addLike(event, drink.recipeID)}
                      className="likeBtn"
                    >
                      {drink.likeID !== null && drink.likeID !== "" ? (
                        <>
                          <StarOutlinedIcon />
                        </>
                      ) : (
                        <>
                          <StarOutlineOutlinedIcon />
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bookmarkBtn">
                      <FavoriteBorderOutlinedIcon />
                    </button>
                    <button className="likeBtn">
                      <StarOutlineOutlinedIcon />
                    </button>
                  </>
                )}
                <button className="reviewBtn">
                  <ChatBubbleOutlineOutlinedIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrinksPage;

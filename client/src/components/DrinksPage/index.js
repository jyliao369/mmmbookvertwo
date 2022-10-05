import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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

  const flipSideTwo = (event, recipeInfo) => {
    event.preventDefault();
    // console.log("hello");

    if (
      document.getElementById(`${recipeInfo}A`).style.display === "" ||
      document.getElementById(`${recipeInfo}A`).style.display === "flex"
    ) {
      document.getElementById(`${recipeInfo}A`).style.display = "none";
      document.getElementById(`${recipeInfo}B`).style.display = "flex";
    } else if (
      document.getElementById(`${recipeInfo}A`).style.display === "none"
    ) {
      document.getElementById(`${recipeInfo}A`).style.display = "flex";
      document.getElementById(`${recipeInfo}B`).style.display = "none";
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

  const bookmarkRecipe = (event, recipeID) => {
    event.preventDefault();
    console.log("bookmarking this recipe");
    console.log(recipeID);

    // Axios.post(`https://mmmbook-vertwo-server.herokuapp.com/createBookmark`, {
    //   userID: currentUser.userID,
    //   username: currentUser.username,
    //   recipeID: recipeID,
    // }).then((response) => {
    //   console.log(response);
    // });
  };

  const addLike = (event, recipeID) => {
    event.preventDefault();
    console.log("i like this recipe");
    console.log(recipeID);

    // Axios.post(`https://mmmbook-vertwo-server.herokuapp.com/createLikes`, {
    //   userID: currentUser.userID,
    //   username: currentUser.username,
    //   recipeID: recipeID,
    // }).then((response) => {
    //   console.log(response);
    //   Axios.get(
    //     `https://mmmbook-vertwo-server.herokuapp.com/getAllRecipes`,
    //     {}
    //   ).then((response) => {
    //     // console.log(response.data);
    //     // setAllRecipes(response.data);
    //   });
    // });
  };

  useEffect(() => {
    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/drinksOnly`,
      {}
    ).then((response) => {
      // console.log("hello");
      // console.log(response);
      setAllDrinks(response.data.reverse());
    });
  }, []);

  return (
    <div className="drinksPage">
      <div className="onlyDrinksCont">
        {allDrinks.map((drink) => (
          <div key={drink.recipeID} className="recipeCard">
            <div className="recipeCardA" id={`recipeCard${drink.recipeID}a`}>
              <div className="recipeCardMainInfo">
                <Link key={drink.recipeID} to={`/recipe/${drink.recipeID}`}>
                  <div className="recipeImage">
                    <div className="recipeImageCont">
                      {drink.recipeImageID === "" ||
                      drink.recipeImageID === null ? (
                        <Image
                          cloudName="du119g90a"
                          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                        ></Image>
                      ) : (
                        <Image
                          cloudName="du119g90a"
                          public_id={drink.recipeImageID}
                        ></Image>
                      )}
                    </div>
                    <div className="recipeInfoCont">
                      <div className="recipeInfoTitle">
                        <h3>{drink.name}</h3>
                      </div>
                      <div
                        className="recipeInfoStatsCont"
                        id="recipeInfoStatsCont"
                      >
                        <div className="recipeInfoStats">
                          <div
                            onClick={(event) =>
                              bookmarkRecipe(event, drink.recipeID)
                            }
                          >
                            <FavoriteBorderOutlinedIcon />
                            <p>#</p>
                          </div>
                          <div
                            onClick={(event) => addLike(event, drink.recipeID)}
                          >
                            <StarOutlineOutlinedIcon />
                            <p>#</p>
                          </div>
                          <div>
                            <ChatBubbleOutlineOutlinedIcon />
                            <p>#</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="recipeInfo">
                  <div
                    className="recipeInfoA"
                    id={`recipeInfo${drink.recipeID}A`}
                  >
                    <div>
                      <h3>Prep Time: </h3>
                      <p>{drink.prepTime} min</p>
                    </div>
                    <div>
                      <h3>Cook Time: </h3>
                      <p>{drink.cookTime} min</p>
                    </div>
                    <div>
                      <h3>Total Time: </h3>
                      <p>{drink.totalTime} min</p>
                    </div>
                    <div>
                      <h3>Yield: </h3>
                      <p>{drink.yield}</p>
                    </div>
                    <div>
                      <h3>Servings: </h3>
                      <p>{drink.servings}</p>
                    </div>
                    <div>
                      <h3>Category: </h3>
                      <p>{drink.category}</p>
                    </div>
                    <div>
                      <h3>Course: </h3>
                      <p>{drink.course}</p>
                    </div>
                    <div>
                      <h3>Cuisine: </h3>
                      <p>{drink.cuisine}</p>
                    </div>
                    <div>
                      <h3>Diet: </h3>
                      <p>{drink.diet}</p>
                    </div>
                  </div>
                  <div
                    className="recipeInfoB"
                    id={`recipeInfo${drink.recipeID}B`}
                  >
                    <h3>Description:</h3>
                    <p className="recipeInfoDesc">{drink.description}</p>
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
            </div>

            <div className="recipeCardC">
              <div className="recipeInfoPoster">
                <Link to={`/userProfile/${drink.userID}`}>
                  <PersonOutlineOutlinedIcon />
                </Link>
                <p>{drink.username} on "date"</p>
              </div>
              <div className="recipeInfoMore">
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(event) =>
                    flipSide(event, `recipeCard${drink.recipeID}`)
                  }
                >
                  <FeedOutlinedIcon />
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(event) =>
                    flipSideTwo(event, `recipeInfo${drink.recipeID}`)
                  }
                >
                  <InfoOutlinedIcon />
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

import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Home = ({ isLoggedIn, setCurrentUser, currentUser }) => {
  const [allRecipes, setAllRecipes] = useState([]);

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
    //     setAllRecipes(response.data);
    //   });
    // });
  };

  useEffect(() => {
    Axios.get(`https://mmmbook-vertwo-server.herokuapp.com/login`, {}).then(
      (response) => {
        if (response.data.loggedIn === true) {
          setCurrentUser(response.data.user[0]);
        }
      }
    );

    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getAllRecipes`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setAllRecipes(response.data);
    });
  }, []);

  return (
    <div className="homePage">
      <div className="homePageCont">
        <div className="allRecipesCont">
          {allRecipes.map((recipe) => (
            <div key={recipe.recipeID} className="recipeCard">
              <div className="recipeCardA" id={`recipeCard${recipe.recipeID}a`}>
                <div className="recipeCardMainInfo">
                  <Link key={recipe.recipeID} to={`/recipe/${recipe.recipeID}`}>
                    <div className="recipeImage">
                      <div className="recipeImageCont">
                        <Image
                          cloudName="du119g90a"
                          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                        ></Image>
                      </div>

                      <div className="test">
                        <div className="recipeInfoTitle">
                          <h3>{recipe.name}</h3>
                        </div>
                        <div
                          className="recipeInfoStatsCont"
                          id="recipeInfoStatsCont"
                        >
                          <div className="recipeInfoStats">
                            <div
                              onClick={(event) =>
                                bookmarkRecipe(event, recipe.recipeID)
                              }
                            >
                              <FavoriteBorderOutlinedIcon />
                              <p>#</p>
                            </div>
                            <div
                              onClick={(event) =>
                                addLike(event, recipe.recipeID)
                              }
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
                      id={`recipeInfo${recipe.recipeID}A`}
                    >
                      <div>
                        <h3>Prep Time: </h3>
                        <p>{recipe.prepTime} min</p>
                      </div>
                      <div>
                        <h3>Cook Time: </h3>
                        <p>{recipe.cookTime} min</p>
                      </div>
                      <div>
                        <h3>Total Time: </h3>
                        <p>{recipe.totalTime} min</p>
                      </div>
                      <div>
                        <h3>Yield: </h3>
                        <p>{recipe.yield}</p>
                      </div>
                      <div>
                        <h3>Servings: </h3>
                        <p>{recipe.servings}</p>
                      </div>
                      <div>
                        <h3>Category: </h3>
                        <p>{recipe.category}</p>
                      </div>
                      <div>
                        <h3>Course: </h3>
                        <p>{recipe.course}</p>
                      </div>
                      <div>
                        <h3>Cuisine: </h3>
                        <p>{recipe.cuisine}</p>
                      </div>
                      <div>
                        <h3>Diet: </h3>
                        <p>{recipe.diet}</p>
                      </div>
                    </div>
                    <div
                      className="recipeInfoB"
                      id={`recipeInfo${recipe.recipeID}B`}
                    >
                      <p>{recipe.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="recipeCardB" id={`recipeCard${recipe.recipeID}b`}>
                <div className="recipeCardIngIns">
                  <div className="recipeCardIng">
                    <h3>Ingredients</h3>
                    <div>
                      {ingrSplit(recipe.ingredients).map((ingredient) => (
                        <p key={ingredient.slice(5, 100)}>{ingredient}</p>
                      ))}
                    </div>
                  </div>
                  <div className="recipeCardIns">
                    <h3>Instructions</h3>
                    <div>
                      {instrSplit(recipe.instructions).map((instruction) => (
                        <p>{instruction}</p>
                      ))}
                    </div>
                  </div>
                </div>
                {/* <div className="recipeCardAdd">
                <h3>Additional Notes:</h3>
                <div>
                  <p>{recipe.addNotes}</p>
                </div>*/}
              </div>

              <div className="recipeCardC">
                {/*
                <button
                  style={{ cursor: "pointer" }}
                  className="chefProfileBtn"
                >
                  <Link to={`/profile/${recipe.userID}`}>
                    <AccountBoxOutlinedIcon />
                  </Link>
                </button>

                {isLoggedIn === true ? (
                  <>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={(event) =>
                        bookmarkRecipe(event, recipe.recipeID)
                      }
                      className="bookmarkBtn"
                    >
                      <FavoriteBorderOutlinedIcon />
                    </button>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={(event) => addLike(event, recipe.recipeID)}
                      className="likeBtn"
                    >
                      <StarOutlineOutlinedIcon />
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
                </button>*/}
                <div className="recipeInfoPoster">
                  <Link to={`/userProfile/${recipe.userID}`}>
                    <PersonOutlineOutlinedIcon />
                  </Link>
                  <p>{recipe.username} on "date"</p>
                </div>
                <div className="recipeInfoMore">
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={(event) =>
                      flipSide(event, `recipeCard${recipe.recipeID}`)
                    }
                  >
                    <FeedOutlinedIcon />
                  </button>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={(event) =>
                      flipSideTwo(event, `recipeInfo${recipe.recipeID}`)
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
    </div>
  );
};

export default Home;

import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

import * as dataList from "../data";

import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const DishesPage = ({ isLoggedIn, setCurrentUser, currentUser }) => {
  const [dishesOnly, setDishesOnly] = useState([]);

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
      `https://mmmbook-vertwo-server.herokuapp.com/dishesOnly`,
      {}
    ).then((response) => {
      // console.log("hello");
      // console.log(response);
      setDishesOnly(response.data.reverse());
    });
  }, []);

  return (
    <div className="dishesPage">
      {/* <div className="filteredSection" id="filteredSection">
        <select>
          <option>Category</option>
          {dataList.category.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        <select>
          <option>Course</option>
          {dataList.course.map((course) => (
            <option>{course}</option>
          ))}
        </select>
        <select>
          <option>Cuisine</option>
          {dataList.cuisine.map((cuisine) => (
            <option>{cuisine}</option>
          ))}
        </select>
        <select>
          <option>Diet</option>
          {dataList.diet.map((diet) => (
            <option>{diet}</option>
          ))}
        </select>
        <select>
          <option>Ingredients</option>
        </select>
        <button>Search</button>
      </div> */}

      <div className="dishesOnlyCont">
        {dishesOnly.map((dish) => (
          <div key={dish.recipeID} className="recipeCard">
            <div className="recipeCardA" id={`recipeCard${dish.recipeID}a`}>
              <div className="recipeCardMainInfo">
                <Link key={dish.recipeID} to={`/recipe/${dish.recipeID}`}>
                  <div className="recipeImage">
                    <div className="recipeImageCont">
                      {dish.recipeImageID === "" ||
                      dish.recipeImageID === null ? (
                        <Image
                          cloudName="du119g90a"
                          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                        ></Image>
                      ) : (
                        <Image
                          cloudName="du119g90a"
                          public_id={dish.recipeImageID}
                        ></Image>
                      )}
                    </div>
                    <div className="recipeInfoCont">
                      <div className="recipeInfoTitle">
                        <h3>{dish.name}</h3>
                      </div>
                      <div
                        className="recipeInfoStatsCont"
                        id="recipeInfoStatsCont"
                      >
                        <div className="recipeInfoStats">
                          <div
                            onClick={(event) =>
                              bookmarkRecipe(event, dish.recipeID)
                            }
                          >
                            <FavoriteBorderOutlinedIcon />
                            <p>#</p>
                          </div>
                          <div
                            onClick={(event) => addLike(event, dish.recipeID)}
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
                    id={`recipeInfo${dish.recipeID}A`}
                  >
                    <div>
                      <h3>Prep Time: </h3>
                      <p>{dish.prepTime} min</p>
                    </div>
                    <div>
                      <h3>Cook Time: </h3>
                      <p>{dish.cookTime} min</p>
                    </div>
                    <div>
                      <h3>Total Time: </h3>
                      <p>{dish.totalTime} min</p>
                    </div>
                    <div>
                      <h3>Yield: </h3>
                      <p>{dish.yield}</p>
                    </div>
                    <div>
                      <h3>Servings: </h3>
                      <p>{dish.servings}</p>
                    </div>
                    <div>
                      <h3>Category: </h3>
                      <p>{dish.category}</p>
                    </div>
                    <div>
                      <h3>Course: </h3>
                      <p>{dish.course}</p>
                    </div>
                    <div>
                      <h3>Cuisine: </h3>
                      <p>{dish.cuisine}</p>
                    </div>
                    <div>
                      <h3>Diet: </h3>
                      <p>{dish.diet}</p>
                    </div>
                  </div>
                  <div
                    className="recipeInfoB"
                    id={`recipeInfo${dish.recipeID}B`}
                  >
                    <h3>Description:</h3>
                    <p className="recipeInfoDesc">{dish.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="recipeCardB" id={`recipeCard${dish.recipeID}b`}>
              <div className="recipeCardIngIns">
                <div className="recipeCardIng">
                  <h3>Ingredients</h3>
                  <div>
                    {ingrSplit(dish.ingredients).map((ingredient) => (
                      <p key={ingredient.slice(5, 100)}>{ingredient}</p>
                    ))}
                  </div>
                </div>
                <div className="recipeCardIns">
                  <h3>Instructions</h3>
                  <div>
                    {instrSplit(dish.instructions).map((instruction) => (
                      <p>{instruction}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="recipeCardC">
              <div className="recipeInfoPoster">
                <Link to={`/userProfile/${dish.userID}`}>
                  <PersonOutlineOutlinedIcon />
                </Link>
                <p>{dish.username} on "date"</p>
              </div>
              <div className="recipeInfoMore">
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(event) =>
                    flipSide(event, `recipeCard${dish.recipeID}`)
                  }
                >
                  <FeedOutlinedIcon />
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(event) =>
                    flipSideTwo(event, `recipeInfo${dish.recipeID}`)
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

export default DishesPage;

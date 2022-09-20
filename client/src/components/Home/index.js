import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

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
        setAllRecipes(response.data);
      });
    });
  };

  useEffect(() => {
    Axios.get(`https://mmmbook-vertwo-server.herokuapp.com/login`, {}).then(
      (response) => {
        if (response.data.loggedIn === true) {
          setCurrentUser(response.data.user[0]);
        }
      }
    );

    Axios.get(`http://localhost:3001/getAllRecipes`, {}).then((response) => {
      console.log(response.data);
      setAllRecipes(response.data);
    });
  }, []);

  return (
    <div className="homePage">
      <div className="pageBanner">
        <p>Home</p>
      </div>
      <div className="allRecipesCont">
        {allRecipes.map((recipe) => (
          <div key={recipe.recipeID} className="recipeCard">
            {/* <Link key={recipe.recipeID} to={`/recipe/${recipe.recipeID}`}> */}
            <div className="recipeCardIn">
              <div className="recipeCardA" id={`recipeCard${recipe.recipeID}a`}>
                <div className="recipeCardMainInfo">
                  <Link key={recipe.recipeID} to={`/recipe/${recipe.recipeID}`}>
                    <div className="recipeImage"></div>
                  </Link>
                  <div className="recipeInfo">
                    <div className="recipeInfoA">
                      <h3>{recipe.name}</h3>
                      <p>Posted by: {recipe.username} on "date"</p>
                      <p>Description: {recipe.description.slice(0, 180)}</p>
                    </div>
                    <div className="recipeInfoB">
                      <div className="recipeInfoBA">
                        <p>Prep Time: {recipe.prepTime} min</p>
                        <p>Cook Time: {recipe.cookTime} min</p>
                        <p>Total Time: {recipe.totalTime} min</p>
                        <p>Yield: {recipe.yield}</p>
                        <p>Servings: {recipe.servings}</p>
                      </div>
                      <div className="recipeInfoBA">
                        <p>Category: {recipe.category}</p>
                        <p>Course: {recipe.course}</p>
                        <p>Cuisine: {recipe.cuisine}</p>
                        <p>Diet: {recipe.diet}</p>
                      </div>
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
                <div className="recipeCardAdd">
                  <h3>Additional Notes:</h3>
                  <p>{recipe.addNotes}</p>
                </div>
              </div>
              <div className="recipeCardC">
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(event) =>
                    flipSide(event, `recipeCard${recipe.recipeID}`)
                  }
                  className="seeInsIngBtn"
                >
                  <FeaturedPlayListOutlinedIcon />
                </button>
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
                      onClick={(event) => addFavorite(event, recipe.recipeID)}
                      className="bookmarkBtn"
                    >
                      <FavoriteBorderOutlinedIcon />
                    </button>

                    <button
                      style={{ cursor: "pointer" }}
                      onClick={(event) => addLike(event, recipe.recipeID)}
                      className="likeBtn"
                    >
                      {recipe.likeID !== null && recipe.likeID !== "" ? (
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
            {/* </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

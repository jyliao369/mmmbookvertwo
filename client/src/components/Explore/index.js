import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";

import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";

const Explore = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState([]);

  const flipSide = (recipeCard) => {
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

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAllRecipes`, {}).then((response) => {
      console.log(response.data);
      setAllRecipes(response.data);
      setShowRecipes(response.data);
    });
  }, []);

  return (
    <div className="explorePage">
      <div className="pageBanner">
        <p>Explore</p>
      </div>
      <div className="allRecipesCont">
        {showRecipes.map((recipe) => (
          <div key={recipe.recipeID} className="recipeCard">
            <div className="recipeCardA" id={`recipeCard${recipe.recipeID}a`}>
              <div className="recipeCardAB">
                <div className="recipeImage"></div>
                <div className="recipeInfo">
                  <div className="recipeInfoA">
                    <h2>{recipe.name}</h2>
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
              <div className="recipeCardBA">
                <div className="recipeCardIng">
                  <h3>Ingredients</h3>
                  <div>
                    {ingrSplit(recipe.ingredients).map((ingredient) => (
                      <p>{ingredient}</p>
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
              <button onClick={() => flipSide(`recipeCard${recipe.recipeID}`)}>
                <FeaturedPlayListOutlinedIcon />
              </button>
              <button>
                <FavoriteBorderOutlinedIcon />
              </button>
              <button>
                <ChatBubbleOutlineOutlinedIcon />
              </button>
              <button>
                <StarOutlineOutlinedIcon />
              </button>
              <button>
                <LibraryAddOutlinedIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;

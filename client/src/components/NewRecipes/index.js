import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";

import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const NewRecipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getAllRecipes`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setAllRecipes(response.data);
    });
  }, []);

  return (
    <div className="newRecipes">
      <h2>Check These New Recipes</h2>

      <div className="newRecipeCont">
        {allRecipes.map((recipe) => (
          <div className="newRecipeCard" key={recipe.recipeID}>
            <h3>{recipe.name}</h3>
            <div className="newRecipeDesc">
              <p>Description: {recipe.description.slice(0, 180)}</p>
            </div>
            <div className="newRecipeInfo">
              <div className="newRecipeInfoA">
                <p>Prep Time: {recipe.prepTime} min</p>
                <p>Cook Time: {recipe.cookTime} min</p>
                <p>Total Time: {recipe.totalTime} min</p>
              </div>
              <div className="newRecipeInfoA">
                <p>Yield: {recipe.yield}</p>
                <p>Servings: {recipe.servings}</p>
                <p>Category: {recipe.category}</p>
              </div>
              <div className="newRecipeInfoA">
                <p>Course: {recipe.course}</p>
                <p>Cuisine: {recipe.cuisine}</p>
                <p>Diet: {recipe.diet}</p>
              </div>
            </div>
            <div className="buttonBar">
              <div className="iconCont">
                <FavoriteBorderOutlinedIcon />#
              </div>
              <div className="iconCont">
                <ChatBubbleOutlineOutlinedIcon />#
              </div>
              <div className="iconCont">
                <StarOutlineOutlinedIcon />
              </div>
              <div className="iconCont">
                <LibraryAddOutlinedIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRecipes;

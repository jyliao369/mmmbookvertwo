import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";

const NewRecipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAllRecipes`, {}).then((response) => {
      console.log(response.data);
      setAllRecipes(response.data);
      setShowRecipes(response.data);
    });
  }, []);

  return (
    <div className="newRecipes">
      <h2>Check These New Recipes</h2>

      <div className="newRecipeCont">
        {showRecipes.map((recipe) => (
          <div className="newRecipe">
            <h3>{recipe.name}</h3>
            <p>Description: {recipe.description.slice(0, 180)}</p>
            <div className="newRecipeInfo">
              <div className="newRecipeInfoA">
                <p>Prep Time: {recipe.prepTime} min</p>
                <p>Cook Time: {recipe.cookTime} min</p>
                <p>Total Time: {recipe.totalTime} min</p>
                <p>Yield: {recipe.yield}</p>
                <p>Servings: {recipe.servings}</p>
              </div>
              <div className="newRecipeInfoA">
                <p>Category: {recipe.category}</p>
                <p>Course: {recipe.course}</p>
                <p>Cuisine: {recipe.cuisine}</p>
                <p>Diet: {recipe.diet}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRecipes;

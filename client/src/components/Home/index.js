import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAllRecipes`, {}).then((response) => {
      console.log(response.data);
      setAllRecipes(response.data);
    });
  }, []);

  return (
    <div className="homePage">
      {allRecipes.map((recipe) => (
        <div className="recipeCard">
          <div key={recipe.recipeID} className="recipeCardA">
            <div className="recipeImage"></div>
            <div className="recipeInfo">
              <div className="recipeInfoA">
                <h2>{recipe.name}</h2>
                <br />
                <p>Description: {recipe.description}</p>
              </div>
              <br />
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
          <div className="recipeCardB"></div>
        </div>
      ))}
    </div>
  );
};

export default Home;

import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";

import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const Explore = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState([]);
  const [searchWord, setSearchWord] = useState("");

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

  const searchRecipe = () => {
    let searchedList = [];

    for (let a = 0; a < allRecipes.length; a++) {
      if (
        allRecipes[a].name.includes(searchWord) ||
        allRecipes[a].ingredients.includes(searchWord) ||
        allRecipes[a].description.includes(searchWord)
      ) {
        searchedList.push(allRecipes[a]);
      }
    }

    // console.log(searchedList);
    setShowRecipes(searchedList);
    setSearchWord("");
  };

  const openAdvSearch = () => {
    if (document.getElementById("filteredSection").style.display === "") {
      document.getElementById("filteredSection").style.display = "flex";
    } else if (
      document.getElementById("filteredSection").style.display === "flex"
    ) {
      document.getElementById("filteredSection").style.display = "";
    }
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAllRecipes`, {}).then((response) => {
      // console.log(response.data);
      setAllRecipes(response.data);
      setShowRecipes(response.data);
    });
  }, []);

  return (
    <div className="explorePage">
      <div className="pageBanner">
        <p>Explore</p>
        <div className="searchBar">
          <input
            placeholder="Search..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          {searchWord === "" ? (
            <button disabled={true}>Search</button>
          ) : (
            <button onClick={() => searchRecipe()}>Search</button>
          )}
          <button onClick={() => setShowRecipes(allRecipes)}>
            {/* <RestartAltRoundedIcon /> */}
            Reset
          </button>
          <button onClick={() => openAdvSearch()}>Filters</button>
        </div>
      </div>

      <div className="filteredSection" id="filteredSection">
        <p>filtered section</p>
        <input placeholder="Category" />
        <input placeholder="Course" />
        <input placeholder="Cuisine" />
        <input placeholder="Diet" />
        <input placeholder="Ingredients" />
        <button>Search</button>
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

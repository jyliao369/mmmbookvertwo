import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

import RecipeCard from "../RecipeCard";

const SearchPage = ({ searchWord, searchedRecipes, foundRecipe }) => {
  useEffect(() => {
    console.log("hello");
  }, []);

  return (
    <div className="searchPage">
      <div className="searchPageResults">
        {foundRecipe === false ? (
          <>
            <h3>
              Sorry!! Couldn't find any recipes. Check out some of these
              recipes!!
            </h3>
          </>
        ) : (
          <>
            <h3>
              Found {searchedRecipes.length} recipes with "{searchWord}"
            </h3>
          </>
        )}
      </div>

      <div className="searchRecipeCont">
        {searchedRecipes.map((recipe) => (
          <>
            <RecipeCard recipe={recipe} />
          </>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;

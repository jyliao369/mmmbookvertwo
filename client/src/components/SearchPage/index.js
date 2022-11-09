import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

import RecipeCard from "../RecipeCard";

const SearchPage = ({ searchWord, searchedRecipes }) => {
  console.log("hello");
  console.log(searchedRecipes);

  return (
    <div className="searchPage">
      {searchedRecipes.length > 0 ? (
        <h2>{searchedRecipes.length} recipes with "searchedWord"</h2>
      ) : (
        <h2>Sorry!! Couldn't any recipes with "searchedWord"</h2>
      )}

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

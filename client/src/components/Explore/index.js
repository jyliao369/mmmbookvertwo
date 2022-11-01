import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";

import RecipeCard from "../RecipeCard";

import * as dataList from "../data";

const Explore = ({ isLoggedIn, setCurrentUser, currentUser }) => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState([]);

  const filteredSearch = (search) => {
    console.log(search);

    let filteredSearch = [];

    for (let a = 0; a < allRecipes.length; a++) {
      if (
        allRecipes[a].category === search ||
        allRecipes[a].diet === search ||
        allRecipes[a].course === search ||
        allRecipes[a].cuisine === search
      ) {
        // console.log(true);
        filteredSearch.push(allRecipes[a]);
      }
    }

    // console.log(filteredSearch);
    setShowRecipes(filteredSearch);
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAllRecipes`, {}).then((response) => {
      // console.log(response.data);
      setAllRecipes(response.data.reverse());
      setShowRecipes(response.data);
    });
  }, []);

  return (
    <div className="explorePage">
      <div className="filteredSection" id="filteredSection">
        <select onChange={(e) => filteredSearch(e.target.value)}>
          <option value={""}>Category</option>
          {dataList.category.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        <select onChange={(e) => filteredSearch(e.target.value)}>
          <option value={""}>Course</option>
          {dataList.course.map((course) => (
            <option value={course}>{course}</option>
          ))}
        </select>
        <select onChange={(e) => filteredSearch(e.target.value)}>
          <option value={""}>Cuisine</option>
          {dataList.cuisine.map((cuisine) => (
            <option value={cuisine}>{cuisine}</option>
          ))}
        </select>
        <select onChange={(e) => filteredSearch(e.target.value)}>
          <option value={""}>Diet</option>
          {dataList.diet.map((diet) => (
            <option value={diet}>{diet}</option>
          ))}
        </select>
        <button onClick={() => setShowRecipes(allRecipes)}>Reset</button>
      </div>

      <div className="allRecipesCont">
        {showRecipes.map((recipe) => (
          <RecipeCard
            recipe={recipe}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </div>
  );
};

export default Explore;

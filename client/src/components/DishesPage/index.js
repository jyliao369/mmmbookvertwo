import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

import RecipeCard from "../RecipeCard";

import * as dataList from "../data";

const DishesPage = ({ isLoggedIn, setCurrentUser, currentUser }) => {
  const [dishesOnly, setDishesOnly] = useState([]);

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
          <RecipeCard recipe={dish} />
        ))}
      </div>
    </div>
  );
};

export default DishesPage;

import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

import RecipeCard from "../RecipeCard";

import * as dataList from "../data";

const DishesPage = ({ isLoggedIn, setCurrentUser, currentUser }) => {
  const [dishesOnly, setDishesOnly] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/dishesOnly`, {}).then((response) => {
      // console.log("hello");
      // console.log(response);
      setDishesOnly(response.data.reverse());
    });
  }, []);

  return (
    <div className="dishesPage">
      <div className="dishesOnlyCont">
        {dishesOnly.map((dish) => (
          <RecipeCard recipe={dish} />
        ))}
      </div>
    </div>
  );
};

export default DishesPage;

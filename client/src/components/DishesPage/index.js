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
      // console.log(response.data);
      setDishesOnly(response.data.reverse());
    });
  }, []);

  return (
    <div className="dishesPage">
      <div className="dishesOnlyCont">
        {dishesOnly.map((dish) => (
          <RecipeCard
            recipe={dish}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </div>
  );
};

export default DishesPage;

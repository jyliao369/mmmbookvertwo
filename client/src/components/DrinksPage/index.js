import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

import RecipeCard from "../RecipeCard";

const DrinksPage = ({ isLoggedIn, setCurrentUser, currentUser }) => {
  const [allDrinks, setAllDrinks] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/drinksOnly`,
      {}
    ).then((response) => {
      // console.log("hello");
      // console.log(response.data);
      setAllDrinks(response.data.reverse());
    });
  }, []);

  return (
    <div className="drinksPage">
      <div className="onlyDrinksCont">
        {allDrinks.map((drink) => (
          <RecipeCard
            recipe={drink}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </div>
  );
};

export default DrinksPage;

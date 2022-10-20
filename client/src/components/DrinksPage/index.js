import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

import RecipeCard from "../RecipeCard";

const DrinksPage = () => {
  const [allDrinks, setAllDrinks] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/drinksOnly`, {}).then((response) => {
      // console.log("hello");
      console.log(response);
      setAllDrinks(response.data.reverse());
    });
  }, []);

  return (
    <div className="drinksPage">
      <div className="onlyDrinksCont">
        {allDrinks.map((drink) => (
          <RecipeCard recipe={drink} />
        ))}
      </div>
    </div>
  );
};

export default DrinksPage;

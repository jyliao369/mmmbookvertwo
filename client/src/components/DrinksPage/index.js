import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

const DrinksPage = () => {
  const [allDrinks, setAllDrinks] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/drinksOnly`, {}).then((response) => {
      console.log("ehllo");
      console.log(response);
      setAllDrinks(response.data.reverse());
    });
  }, []);

  return (
    <div>
      <div className="pageBanner">
        <p>Drinks and Beverages</p>
      </div>
      <div>
        {allDrinks.map((drink) => (
          <div>{drink.name}</div>
        ))}
      </div>
    </div>
  );
};

export default DrinksPage;

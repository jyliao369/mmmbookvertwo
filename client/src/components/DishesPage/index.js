import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

const DishesPage = () => {
  const [dishesOnly, setDishesOnly] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/dishesOnly`, {}).then((response) => {
      console.log("ehllo");
      console.log(response);
      setDishesOnly(response.data.reverse());
    });
  }, []);

  return (
    <div>
      <div className="pageBanner">
        <p>Entrees and Dishes only</p>
      </div>
      <div>
        {dishesOnly.map((drink) => (
          <div>{drink.name}</div>
        ))}
      </div>
    </div>
  );
};

export default DishesPage;

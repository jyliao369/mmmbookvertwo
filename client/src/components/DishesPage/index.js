import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

import * as dataList from "../data";

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
      <div className="filteredSection" id="filteredSection">
        {/* <input placeholder="Category" /> */}
        <select>
          <option>Category</option>
          {dataList.category.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        {/* <input placeholder="Course" /> */}
        <select>
          <option>Course</option>
          {dataList.course.map((course) => (
            <option>{course}</option>
          ))}
        </select>
        {/* <input placeholder="Cuisine" /> */}
        <select>
          <option>Cuisine</option>
          {dataList.cuisine.map((cuisine) => (
            <option>{cuisine}</option>
          ))}
        </select>
        {/* <input placeholder="Diet" /> */}
        <select>
          <option>Diet</option>
          {dataList.diet.map((diet) => (
            <option>{diet}</option>
          ))}
        </select>
        {/* <input placeholder="Ingredients" /> */}
        <select>
          <option>Ingredients</option>
        </select>
        <button>Search</button>
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

import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipePage = () => {
  let { recipeID } = useParams();

  const [recipeInfo, setRecipeInfo] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getRecipe/${recipeID}`, {}).then(
      (response) => {
        console.log(response);
        // setRecipeInfo()
      }
    );
  });

  return (
    <div className="recipePage">
      <div className="recipeCardOne"></div>
      <div className="recipeCardTwo"></div>
    </div>
  );
};

export default RecipePage;

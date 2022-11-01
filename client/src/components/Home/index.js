import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";

import RecipeCard from "../RecipeCard";

const Home = ({ isLoggedIn, setCurrentUser, currentUser }) => {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAllRecipes`, {}).then((response) => {
      // console.log(response.data);
      setAllRecipes(response.data.reverse());
    });
  }, []);

  return (
    <div className="homePage">
      <div className="allRecipesCont">
        {allRecipes.map((recipe, index) => (
          <>
            <RecipeCard
              recipe={recipe}
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;

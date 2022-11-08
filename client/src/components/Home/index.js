import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";

import RecipeCard from "../RecipeCard";
import LoadingCard from "../LoadingCard";

const Home = ({ isLoggedIn, setCurrentUser, currentUser }) => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const changeLoading = () => {
    setIsLoading(!isLoading);
  };

  useEffect(() => {
    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getAllRecipes`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setAllRecipes(response.data.reverse());

      setTimeout(changeLoading, 2000);
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

import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";

import RecipeCard from "../RecipeCard";

const Home = ({ isLoggedIn, setCurrentUser, currentUser }) => {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    Axios.get(`https://mmmbook-vertwo-server.herokuapp.com/login`, {}).then(
      (response) => {
        if (response.data.loggedIn === true) {
          setCurrentUser(response.data.user[0]);
        }
      }
    );

    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getAllRecipes`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setAllRecipes(response.data.reverse());
    });
  }, []);

  return (
    <div className="homePage">
      <div className="homePageCont">
        <div className="allRecipesCont">
          {allRecipes.map((recipe) => (
            <RecipeCard recipe={recipe} currentUser={currentUser} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

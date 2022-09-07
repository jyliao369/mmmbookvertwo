import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";

const Profile = ({ currentUser }) => {
  let { userID } = useParams();

  const [userRecipes, setUserRecipes] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  const myRecipes = () => {
    console.log("getting my recipes");

    document.getElementById("userRecipes").style.display = "flex";
    document.getElementById("userReviews").style.display = "none";
  };

  const myReviews = () => {
    console.log("getting my reviews");

    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userReviews").style.display = "flex";
  };

  const myFollowers = () => {
    console.log("getting my followers");
  };

  const imFollowing = () => {
    console.log("who am i following");
  };

  const flipSide = (event, recipeCard) => {
    event.preventDefault();

    if (
      document.getElementById(`${recipeCard}a`).style.display === "" ||
      document.getElementById(`${recipeCard}a`).style.display === "flex"
    ) {
      document.getElementById(`${recipeCard}a`).style.display = "none";
      document.getElementById(`${recipeCard}b`).style.display = "flex";
    } else if (
      document.getElementById(`${recipeCard}a`).style.display === "none"
    ) {
      document.getElementById(`${recipeCard}a`).style.display = "flex";
      document.getElementById(`${recipeCard}b`).style.display = "none";
    }
  };

  const instrSplit = (instr) => {
    // console.log(test.split("."));
    return instr.split(".");
  };

  const ingrSplit = (ingre) => {
    // console.log(ingre.split("\n"));
    return ingre.split("\n");
  };

  const ratingStar = (rating) => {
    if (rating === 1) {
      return (
        <>
          <StarPurple500OutlinedIcon />
        </>
      );
    } else if (rating === 2) {
      return (
        <>
          <StarPurple500OutlinedIcon />
          <StarPurple500OutlinedIcon />
        </>
      );
    } else if (rating === 3) {
      return (
        <>
          <StarPurple500OutlinedIcon />
          <StarPurple500OutlinedIcon />
          <StarPurple500OutlinedIcon />
        </>
      );
    } else if (rating === 4) {
      return (
        <>
          <StarPurple500OutlinedIcon />
          <StarPurple500OutlinedIcon />
          <StarPurple500OutlinedIcon />
          <StarPurple500OutlinedIcon />
        </>
      );
    } else if (rating === 5) {
      return (
        <>
          <StarPurple500OutlinedIcon />
          <StarPurple500OutlinedIcon />
          <StarPurple500OutlinedIcon />
          <StarPurple500OutlinedIcon />
          <StarPurple500OutlinedIcon />
        </>
      );
    }
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAllRecipesID/${userID}`).then(
      (response) => {
        // console.log("hello");
        // console.log(response.data);
        setUserRecipes(response.data);
      }
    );
    Axios.get(`http://localhost:3001/getAllReviewsID/${userID}`).then(
      (response) => {
        console.log("there");
        console.log(response.data);
        setUserReviews(response.data);
      }
    );
  }, []);

  return (
    <div className="profilePage">
      <div className="chefProfileCard">
        <div className="chefProfileIcon"></div>
        <div className="chefProfileInfo">
          <p>{currentUser.username}</p>
          <p>{currentUser.firstName}</p>
          <p>{currentUser.lastName}</p>
          <p>{currentUser.email}</p>
        </div>
      </div>
      <div className="chefProfileNavBar">
        <div onClick={() => myRecipes()} style={{ cursor: "pointer" }}>
          My Recipes
        </div>
        <div onClick={() => myReviews()} style={{ cursor: "pointer" }}>
          My Reviews
        </div>
        <div>My Favorites</div>
        <div onClick={() => myFollowers()} style={{ cursor: "pointer" }}>
          Followers
        </div>
        <div onClick={() => imFollowing()} style={{ cursor: "pointer" }}>
          Following
        </div>
      </div>

      <div className="userRecipes" id="userRecipes">
        {userRecipes.map((recipe) => (
          <div key={recipe.recipeID} className="recipeCard">
            {/* <Link key={recipe.recipeID} to={`/recipe/${recipe.recipeID}`}> */}
            <div className="recipeCardIn">
              <div className="recipeCardA" id={`recipeCard${recipe.recipeID}a`}>
                <div className="recipeCardAB">
                  <div className="recipeImage"></div>
                  <div className="recipeInfo">
                    <div className="recipeInfoA">
                      <h2>{recipe.name}</h2>
                      <p>Description: {recipe.description.slice(0, 180)}</p>
                    </div>
                    <div className="recipeInfoB">
                      <div className="recipeInfoBA">
                        <p>Prep Time: {recipe.prepTime} min</p>
                        <p>Cook Time: {recipe.cookTime} min</p>
                        <p>Total Time: {recipe.totalTime} min</p>
                        <p>Yield: {recipe.yield}</p>
                        <p>Servings: {recipe.servings}</p>
                      </div>
                      <div className="recipeInfoBA">
                        <p>Category: {recipe.category}</p>
                        <p>Course: {recipe.course}</p>
                        <p>Cuisine: {recipe.cuisine}</p>
                        <p>Diet: {recipe.diet}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="recipeCardB" id={`recipeCard${recipe.recipeID}b`}>
                <div className="recipeCardBA">
                  <div className="recipeCardIng">
                    <h3>Ingredients</h3>
                    <div>
                      {ingrSplit(recipe.ingredients).map((ingredient) => (
                        <p key={ingredient.slice(5, 100)}>{ingredient}</p>
                      ))}
                    </div>
                  </div>
                  <div className="recipeCardIns">
                    <h3>Instructions</h3>
                    <div>
                      {instrSplit(recipe.instructions).map((instruction) => (
                        <p>{instruction}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="recipeCardAdd">
                  <h3>Additional Notes:</h3>
                  <p>{recipe.addNotes}</p>
                </div>
              </div>
              <div className="recipeCardC">
                <button
                  onClick={(event) =>
                    flipSide(event, `recipeCard${recipe.recipeID}`)
                  }
                >
                  <FeaturedPlayListOutlinedIcon />
                </button>
                <button>
                  <FavoriteBorderOutlinedIcon />
                </button>
                <button>
                  <ChatBubbleOutlineOutlinedIcon />
                </button>
                {/* <button>
                    <StarOutlineOutlinedIcon />
                  </button>
                  <button>
                    <LibraryAddOutlinedIcon />
                  </button> */}
              </div>
            </div>
            {/* </Link> */}
          </div>
        ))}
      </div>

      <div className="userReviews" id="userReviews">
        {userReviews.map((review) => (
          <div className="userRatingCont">
            <div className="userRating">
              <div className="profileIcon">
                <div className="profileImg" />
              </div>
              <div className="userReview">
                <h3>{review.username} Posted on: (date)</h3>
                {review.rating === 1 ? <>{ratingStar(1)}</> : <></>}
                {review.rating === 2 ? <>{ratingStar(2)}</> : <></>}
                {review.rating === 3 ? <>{ratingStar(3)}</> : <></>}
                {review.rating === 4 ? <>{ratingStar(4)}</> : <></>}
                {review.rating === 5 ? <>{ratingStar(5)}</> : <></>}
                <p>{review.review}</p>
              </div>
            </div>
          </div>
          // <div key={review.reviewID}>{review.review}</div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

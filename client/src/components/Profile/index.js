import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import GroupRemoveOutlinedIcon from "@mui/icons-material/GroupRemoveOutlined";

const Profile = ({ isLoggedIn, currentUser }) => {
  let { userID } = useParams();

  const [profileUser, setProfileUser] = useState([]);

  const [userRecipes, setUserRecipes] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  const [isFollowing, setIsFollowing] = useState(false);

  const myRecipes = () => {
    document.getElementById("userRecipes").style.display = "flex";
    document.getElementById("userReviews").style.display = "none";
  };

  const myReviews = () => {
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

  const followUser = (chefUserInfo) => {
    let chefUserID = chefUserInfo[0];
    let chefUsername = chefUserInfo[1];

    Axios.post(`http://localhost:3001/followingUser/${chefUserID}`, {
      userID: currentUser.userID,
      username: currentUser.username,
      chefUsername: chefUsername,
    }).then((response) => {
      console.log(response);
      setIsFollowing(!isFollowing);
    });
  };

  useEffect(() => {
    Axios.get(`https://mmmbook-vertwo-server.herokuapp.com/login`, {}).then(
      (response) => {
        if (response.data.loggedIn === true) {
          // console.log("hello");
          // console.log(response.data.user[0].userID);
          // console.log(userID);

          Axios.get(
            `http://localhost:3001/test/${response.data.user[0].userID},${userID}`,
            {}
          ).then((response) => {
            // console.log(response.data.following);
            setIsFollowing(response.data.following);
          });
        }
      }
    );

    Axios.get(`http://localhost:3001/getUser/${userID}`, {}).then(
      (response) => {
        // console.log(response.data[0]);
        setProfileUser(response.data[0]);
      }
    );
    Axios.get(`http://localhost:3001/getAllRecipesID/${userID}`).then(
      (response) => {
        // console.log("hello");
        // console.log(response.data);
        setUserRecipes(response.data.reverse());
      }
    );
    Axios.get(`http://localhost:3001/getAllReviewsID/${userID}`).then(
      (response) => {
        // console.log("there");
        // console.log(response.data);
        setUserReviews(response.data.reverse());
      }
    );
  }, []);

  return (
    <div className="profilePage">
      <div className="chefProfileCard">
        <div className="chefProfileIcon"></div>
        <div className="chefProfileInfo">
          <div className="chefProfileInfoA" id="chefProfileInfoA">
            <div className="chefProfileInfoAb">
              <div className="chefProfileInfoAc">
                <h3>{profileUser.username}</h3>
                <h3>
                  {profileUser.firstName} {profileUser.lastName}
                </h3>
              </div>
              <div className="chefProfileInfoAc">
                <h3>Rating</h3>
              </div>
            </div>

            <h3>{profileUser.chefDesc}</h3>
            <h3>{profileUser.email}</h3>
            <h3>Number of Recipes: {userRecipes.length}</h3>
            <h3>Favorite Recipe: {profileUser.favRecipe}</h3>
            <h3>Favorite Beverage: {profileUser.favBeverage}</h3>
            <h3>Favorite Dessert: {profileUser.favDessert}</h3>
            <h3>Favorite Cuisine: {profileUser.favCuisine}</h3>
          </div>

          <div className="chefProfileBtn">
            {isLoggedIn === true ? (
              <>
                {isFollowing === true ? (
                  <button
                    onClick={() =>
                      followUser([profileUser.userID, profileUser.username])
                    }
                  >
                    <GroupRemoveOutlinedIcon />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      followUser([profileUser.userID, profileUser.username])
                    }
                  >
                    <GroupAddOutlinedIcon />
                  </button>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
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

      {/* ALL USER RECIPES */}
      <div className="userRecipes" id="userRecipes">
        {userRecipes.length > 0 ? (
          <>
            {userRecipes.map((recipe) => (
              <div key={recipe.recipeID} className="recipeCard">
                {/* <Link key={recipe.recipeID} to={`/recipe/${recipe.recipeID}`}> */}
                <div className="recipeCardIn">
                  <div
                    className="recipeCardA"
                    id={`recipeCard${recipe.recipeID}a`}
                  >
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
                  <div
                    className="recipeCardB"
                    id={`recipeCard${recipe.recipeID}b`}
                  >
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
                          {instrSplit(recipe.instructions).map(
                            (instruction) => (
                              <p>{instruction}</p>
                            )
                          )}
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
                  </div>
                </div>
                {/* </Link> */}
              </div>
            ))}
          </>
        ) : (
          <div className="notification">
            <h2>No Recipes</h2>
          </div>
        )}
      </div>

      {/* ALL USER REVIEWS */}
      <div className="userReviews" id="userReviews">
        {userReviews.length > 0 ? (
          <>
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
            ))}
          </>
        ) : (
          <div className="notification">
            <h2>No Reviews</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

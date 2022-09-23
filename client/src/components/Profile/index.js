import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

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

  const addFavorite = (event, recipeID) => {
    event.preventDefault();

    Axios.post(`http://localhost:3001/createBookmark`, {
      userID: currentUser.userID,
      username: currentUser.username,
      recipeID: recipeID,
    }).then((response) => {
      console.log(response);
    });
  };

  const addLike = (event, recipeID) => {
    event.preventDefault();

    Axios.post(`http://localhost:3001/createLikes`, {
      userID: currentUser.userID,
      username: currentUser.username,
      recipeID: recipeID,
    }).then((response) => {
      console.log(response);
      Axios.get(`http://localhost:3001/getAllRecipes`, {}).then((response) => {
        // console.log(response.data);
        // setAllRecipes(response.data);
      });
    });
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
      <div className="chefProfileCardCont">
        <div className="chefProfileCard">
          <div className="chefProfileIcon">
            <div class="userIconCont">
              <div className="userIcon"></div>
              <h3>{profileUser.username}</h3>
            </div>
          </div>
          <div className="chefProfileInfo">
            <div className="chefProfileInfoA" id="chefProfileInfoA">
              <div className="chefProfileInfoAb">
                <h3>
                  {profileUser.firstName} {profileUser.lastName}
                </h3>
                <h3>Rating: "Star"</h3>
              </div>
              <div className="chefProfileInfoAc">
                <h3>{profileUser.chefDesc}</h3>
              </div>
              {/* <div>
              <p>Number of Recipes: </p>
              <p>{userRecipes.length}</p>
            </div> */}
              <div className="chefProfileInfoAd">
                <div>
                  <h3>Favorite Recipe: </h3>
                  <p>{profileUser.favRecipe}</p>
                </div>
                <div>
                  <h3>Favorite Beverage: </h3>
                  <p>{profileUser.favBeverage}</p>
                </div>
              </div>
              <div className="chefProfileInfoAd">
                <div>
                  <h3>Favorite Dessert: </h3>
                  <p>{profileUser.favDessert}</p>
                </div>
                <div>
                  <h3>Favorite Cuisine: </h3>
                  <p>{profileUser.favCuisine}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chefProfileNavBar">
        <div onClick={() => myRecipes()} style={{ cursor: "pointer" }}>
          My Recipes
        </div>
        <div>My Favorites</div>
        <div onClick={() => myReviews()} style={{ cursor: "pointer" }}>
          My Reviews
        </div>
        <div onClick={() => myFollowers()} style={{ cursor: "pointer" }}>
          Followers
        </div>
        <div onClick={() => imFollowing()} style={{ cursor: "pointer" }}>
          Following
        </div>
      </div>

      <div className="userProfilePageMain">
        {/* ALL USER RECIPES */}
        <div className="userRecipes" id="userRecipes">
          {userRecipes.length > 0 ? (
            <>
              {userRecipes.map((recipe) => (
                <div key={recipe.recipeID} className="recipeCard">
                  <div className="recipeCardIn">
                    <div
                      className="recipeCardA"
                      id={`recipeCard${recipe.recipeID}a`}
                    >
                      <div className="recipeCardMainInfo">
                        <Link
                          key={recipe.recipeID}
                          to={`/recipe/${recipe.recipeID}`}
                        >
                          <div className="recipeImage"></div>
                        </Link>
                        <div className="recipeInfo">
                          <div className="recipeInfoA">
                            <h3>{recipe.name}</h3>
                            <p>Posted by: {recipe.username} on "date"</p>
                            <p>
                              Description: {recipe.description.slice(0, 180)}
                            </p>
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
                      <div className="recipeCardIngIns">
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
                        <div>
                          <p>{recipe.addNotes}</p>
                        </div>
                      </div>
                    </div>
                    <div className="recipeCardC">
                      <button
                        style={{ cursor: "pointer" }}
                        onClick={(event) =>
                          flipSide(event, `recipeCard${recipe.recipeID}`)
                        }
                        className="seeInsIngBtn"
                      >
                        <FeaturedPlayListOutlinedIcon />
                      </button>
                      <button
                        style={{ cursor: "pointer" }}
                        className="chefProfileBtn"
                      >
                        <Link to={`/profile/${recipe.userID}`}>
                          <AccountBoxOutlinedIcon />
                        </Link>
                      </button>

                      {isLoggedIn === true ? (
                        <>
                          <button
                            style={{ cursor: "pointer" }}
                            onClick={(event) =>
                              addFavorite(event, recipe.recipeID)
                            }
                            className="bookmarkBtn"
                          >
                            <FavoriteBorderOutlinedIcon />
                          </button>

                          <button
                            style={{ cursor: "pointer" }}
                            onClick={(event) => addLike(event, recipe.recipeID)}
                            className="likeBtn"
                          >
                            {recipe.likeID !== null && recipe.likeID !== "" ? (
                              <>
                                <StarOutlinedIcon />
                              </>
                            ) : (
                              <>
                                <StarOutlineOutlinedIcon />
                              </>
                            )}
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="bookmarkBtn">
                            <FavoriteBorderOutlinedIcon />
                          </button>
                          <button className="likeBtn">
                            <StarOutlineOutlinedIcon />
                          </button>
                        </>
                      )}
                      <button className="reviewBtn">
                        <ChatBubbleOutlineOutlinedIcon />
                      </button>
                    </div>
                  </div>
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
    </div>
  );
};

export default Profile;

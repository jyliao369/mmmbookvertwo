import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import RecipeCard from "../RecipeCard";

import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";

const Profile = ({ isLoggedIn, currentUser }) => {
  let { userID } = useParams();

  const [profileUser, setProfileUser] = useState([]);

  const [userRecipes, setUserRecipes] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [userBookmarked, setUserBookmarked] = useState([]);
  const [chefsFollowing, setChefsFollowing] = useState([]);
  const [chefFollowers, setChefFollowers] = useState([]);

  const [isFollowing, setIsFollowing] = useState(false);

  const myRecipes = () => {
    // console.log("getting my recipes");

    document.getElementById("userRecipes").style.display = "flex";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("userFollowers").style.display = "none";
    document.getElementById("userFollowing").style.display = "none";
  };

  const myFavorite = () => {
    // console.log("getting my bookmark");

    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "flex";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("userFollowers").style.display = "none";
    document.getElementById("userFollowing").style.display = "none";
  };

  const myReviews = () => {
    // console.log("getting my reviews");

    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "flex";
    document.getElementById("userFollowers").style.display = "none";
    document.getElementById("userFollowing").style.display = "none";
  };

  const myFollowers = () => {
    // console.log("getting my followers");

    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("userFollowers").style.display = "flex";
    document.getElementById("userFollowing").style.display = "none";
  };

  const imFollowing = () => {
    // console.log("who am i following");

    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("userFollowers").style.display = "none";
    document.getElementById("userFollowing").style.display = "flex";
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

    Axios.post(
      `https://mmmbook-vertwo-server.herokuapp.com/followingUser/${chefUserID}`,
      {
        userID: currentUser.userID,
        username: currentUser.username,
        chefUsername: chefUsername,
      }
    ).then((response) => {
      console.log(response);
      setIsFollowing(!isFollowing);
    });
  };

  useEffect(() => {
    Axios.get(`https://mmmbook-vertwo-server.herokuapp.com/login`, {}).then(
      (response) => {
        if (response.data.loggedIn === true) {
          Axios.get(
            `https://mmmbook-vertwo-server.herokuapp.com/test/${response.data.user[0].userID},${userID}`,
            {}
          ).then((response) => {
            // console.log(response.data.following);
            setIsFollowing(response.data.following);
          });
        }
      }
    );

    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getUser/${userID}`,
      {}
    ).then((response) => {
      // console.log(response.data[0]);
      setProfileUser(response.data[0]);
    });
    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getAllRecipesID/${userID}`,
      {}
    ).then((response) => {
      console.log("hello");
      console.log(response.data);
      setUserRecipes(response.data.reverse());
    });
    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getBookmarked/${userID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setUserBookmarked(response.data.reverse());
    });
    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getAllReviewsID/${userID}`
    ).then((response) => {
      // console.log("there");
      // console.log(response.data);
      setUserReviews(response.data.reverse());
    });
  }, []);

  return (
    <div className="profilePage">
      <div className="chefProfileCardCont">
        <div className="chefProfileCard">
          <div className="chefProfileCardA">
            <div className="chefProfileCardAHead">
              <h2>My Profile</h2>
            </div>
            <div className="chefProfileImage" />
            <div className="chefProfileInfo">
              <h3>{profileUser.username} joined on 'date'</h3>
              <h3>
                {profileUser.firstName} {profileUser.lastName}
              </h3>
              <h3>{profileUser.email}</h3>
              <h3>"Rating"</h3>
            </div>
          </div>
          <div className="chefProfileCardB">
            <div className="chefProfileCardBOne">
              <div>
                <div className="chefProfileCardBHead">
                  <h2>About Me</h2>
                </div>
                <div className="chefProfileCardBDesc">
                  <h3>{profileUser.chefDesc}</h3>
                </div>
                <div className="chefProfileCardBInfo">
                  <div>
                    <h3>Favorite Recipe: </h3>
                    <p>{profileUser.favRecipe}</p>
                  </div>
                  <div>
                    <h3>Favorite Beverage: </h3>
                    <p>{profileUser.favBeverage}</p>
                  </div>
                </div>
                <div className="chefProfileCardBInfo">
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
              <div className="chefProfileCardBStats">
                <div>
                  <h3>Dishes Created:</h3>
                  <p>{userRecipes.length}</p>
                </div>
                <div>
                  <h3>Drinks Created:</h3>
                  <p>"Number"</p>
                </div>
                <div>
                  <h3>Recipes Cooked:</h3>
                  <p>"Number"</p>
                </div>
              </div>
            </div>
            <div className="chefProfileNavBar">
              <div onClick={() => myRecipes()} style={{ cursor: "pointer" }}>
                My Recipes
              </div>
              <div onClick={() => myFavorite()} style={{ cursor: "pointer" }}>
                My Favorites
              </div>
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
          </div>
        </div>
      </div>

      <div className="userProfilePageMain">
        <div className="userProfilePageMainCont">
          <div className="usersRecipes" id="userRecipes">
            {userRecipes.length > 0 ? (
              <>
                {userRecipes.map((recipe) => (
                  <RecipeCard recipe={recipe} />
                ))}
              </>
            ) : (
              <div className="notification">
                <h2>
                  You have no Recipes. Add and share some of your recipes!!
                </h2>
              </div>
            )}
          </div>

          <div className="userBookmarked" id="userBookmarked">
            {userBookmarked.length > 0 ? (
              <>
                {userBookmarked.map((recipe) => (
                  <RecipeCard recipe={recipe} />
                ))}
              </>
            ) : (
              <div className="notification">
                <h2>You don't have any recipes bookmarked.</h2>
              </div>
            )}
          </div>

          <div className="userReviews" id="userReviews">
            {userReviews.length > 0 ? (
              <>
                {userReviews.map((review) => (
                  <div className="userRatingCont">
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
                ))}
              </>
            ) : (
              <div className="notification">
                <h2>
                  You have no reviews!! Check out some recipes and share you
                  thoughts!!
                </h2>
              </div>
            )}
          </div>

          <div className="userFollowers" id="userFollowers">
            {chefFollowers.length > 0 ? (
              <>
                {chefFollowers.map((chef) => (
                  <div className="followingProfile">
                    <div className="followingIcon" />
                    <Link to={`/profile/${chef.chefUserID}`}>
                      <h3>{chef.username}</h3>
                    </Link>
                  </div>
                ))}
              </>
            ) : (
              <div className="notification">
                <h2>You don't have any followers!!</h2>
              </div>
            )}
          </div>

          <div className="userFollowing" id="userFollowing">
            {chefsFollowing.length > 0 ? (
              <>
                {chefsFollowing.map((chef) => (
                  <div className="followingProfile">
                    <div className="followingIcon" />
                    <Link to={`/profile/${chef.chefUserID}`}>
                      <h3>{chef.chefUsername}</h3>
                    </Link>
                  </div>
                ))}
              </>
            ) : (
              <div className="notification">
                <h2>You are not following anybody !!</h2>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="chefProfileCardCont">
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
              <div>
                <p>Number of Recipes: </p>
                <p>{userRecipes.length}</p>
              </div>
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
                          <h3>{recipe.name}</h3>
                          <div className="recipeInfoPoster">
                            <p>Posted by: {recipe.username} on "date"</p>
                          </div>
                          <div className="recipeInfoDesc">
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
      </div> */}
    </div>
  );
};

export default Profile;

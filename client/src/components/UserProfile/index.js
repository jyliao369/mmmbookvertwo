import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import CopyAllOutlinedIcon from "@mui/icons-material/CopyAllOutlined";

import * as dataList from "../data";

const UserProfile = ({ currentUser }) => {
  let { userID } = useParams();

  const [profileUser, setProfileUser] = useState([]);

  const [userRecipes, setUserRecipes] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [userBookmarked, setUserBookmarked] = useState([]);
  const [chefsFollowing, setChefsFollowing] = useState([]);
  const [chefFollowers, setChefFollowers] = useState([]);

  const [updateUser, setUpdateUser] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [updateFirst, setUpdateFirst] = useState("");
  const [updateLast, setUpdateLast] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePass, setUpdatePass] = useState("");
  const [updateRePass, setUpdateRePass] = useState("");
  const [updateFavRec, setUpdateFavRec] = useState("");
  const [updateFavBev, setUpdateFavBev] = useState("");
  const [updateFavDes, setUpdateFavDes] = useState("");
  const [updateFavCui, setUpdateFavCui] = useState("");

  const myRecipes = () => {
    // console.log("getting my recipes");

    document.getElementById("userRecipes").style.display = "flex";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("usersFollowers").style.display = "none";
    document.getElementById("usersFollowing").style.display = "none";
  };

  const myFavorite = () => {
    // console.log("getting my bookmark");

    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "flex";
    document.getElementById("userReviews").style.display = "nopne";
    document.getElementById("usersFollowers").style.display = "none";
    document.getElementById("usersFollowing").style.display = "none";
  };

  const myReviews = () => {
    // console.log("getting my reviews");

    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "flex";
    document.getElementById("usersFollowers").style.display = "none";
    document.getElementById("usersFollowing").style.display = "none";
  };

  const myFollowers = () => {
    // console.log("getting my followers");

    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("usersFollowers").style.display = "flex";
    document.getElementById("usersFollowing").style.display = "none";
  };

  const imFollowing = () => {
    // console.log("who am i following");

    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("usersFollowers").style.display = "none";
    document.getElementById("usersFollowing").style.display = "flex";
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

  const settingsFlip = () => {
    if (
      document.getElementById("chefProfileInfoA").style.display === "flex" ||
      document.getElementById("chefProfileInfoA").style.display === ""
    ) {
      document.getElementById("chefProfileInfoA").style.display = "none";
      document.getElementById("chefProfileSettings").style.display = "flex";
    } else {
      document.getElementById("chefProfileInfoA").style.display = "flex";
      document.getElementById("chefProfileSettings").style.display = "none";
    }
  };

  const updateProfile = () => {
    Axios.put(`http://localhost:3001/updateUser/${userID}`, {
      firstName: updateFirst,
      lastName: updateLast,
      username: updateUser,
      email: updateEmail,
      favRecipe: updateFavRec,
      favBeverage: updateFavBev,
      favDessert: updateFavDes,
      favCuisine: updateFavCui,
      chefDesc: updateDesc,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/getUser/${userID}`, {}).then(
      (response) => {
        // console.log(response.data[0]);
        setProfileUser(response.data[0]);

        setUpdateUser(response.data[0].username);
        setUpdateDesc(response.data[0].chefDesc);
        setUpdateFirst(response.data[0].firstName);
        setUpdateLast(response.data[0].lastName);
        setUpdateEmail(response.data[0].email);
        setUpdateFavRec(response.data[0].favRecipe);
        setUpdateFavBev(response.data[0].favBeverage);
        setUpdateFavDes(response.data[0].favDessert);
        setUpdateFavCui(response.data[0].favCuisine);
      }
    );

    Axios.get(`http://localhost:3001/getAllRecipesID/${userID}`, {}).then(
      (response) => {
        // console.log(response.data);
        setUserRecipes(response.data.reverse());
      }
    );
    Axios.get(`http://localhost:3001/getAllReviewsID/${userID}`, {}).then(
      (response) => {
        // console.log(response.data);
        setUserReviews(response.data.reverse());
      }
    );
    Axios.get(`http://localhost:3001/getBookmarked/${userID}`, {}).then(
      (response) => {
        // console.log(response.data);
        setUserBookmarked(response.data.reverse());
      }
    );
    Axios.get(`http://localhost:3001/allFollowing/${userID}`, {}).then(
      (response) => {
        // console.log(response.data);
        setChefsFollowing(response.data.reverse());
      }
    );
    Axios.get(`http://localhost:3001/allFollowers/${userID}`, {}).then(
      (response) => {
        // console.log(response);
        setChefFollowers(response.data.reverse());
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
            <div className="chefProfileSettings" id="chefProfileSettings">
              <input
                placeholder="Username"
                value={updateUser}
                onChange={(e) => setUpdateUser(e.target.value)}
              />
              <textarea
                placeholder="Describe yourself"
                rows={3}
                value={updateDesc}
                onChange={(e) => setUpdateDesc(e.target.value)}
              />
              <input
                placeholder="Email"
                value={updateEmail}
                onChange={(e) => setUpdateEmail(e.target.value)}
              />
              <div className="chefProfileUpdate">
                <div className="chefProfileUpdateA">
                  <input
                    placeholder="First Name"
                    value={updateFirst}
                    onChange={(e) => setUpdateFirst(e.target.value)}
                  />
                  <input
                    placeholder="Last Name"
                    value={updateLast}
                    onChange={(e) => setUpdateLast(e.target.value)}
                  />
                </div>
                <div className="chefProfileUpdateA">
                  <input
                    placeholder="New Password"
                    value={updatePass}
                    onChange={(e) => setUpdatePass(e.target.value)}
                  />
                  <input
                    placeholder="Re-Type Password"
                    value={updateRePass}
                    onChange={(e) => setUpdateRePass(e.target.value)}
                  />
                </div>
              </div>
              <div className="chefProfileUpdate">
                <div className="chefProfileUpdateA">
                  <select
                    value={updateFavRec}
                    onChange={(e) => setUpdateFavRec(e.target.value)}
                  >
                    <option value="" disabled={true} selected>
                      Favorite Recipe
                    </option>
                    {userRecipes.map((recipe) => (
                      <option>{recipe.name}</option>
                    ))}
                  </select>
                  <select
                    value={updateFavBev}
                    onChange={(e) => setUpdateFavBev(e.target.value)}
                  >
                    <option value="" disabled={true} selected>
                      Favorite Beverage
                    </option>
                    {userRecipes.map((recipe) =>
                      recipe.category === "Drinks" ||
                      recipe.category === "Beverage" ? (
                        <option>{recipe.name}</option>
                      ) : (
                        <></>
                      )
                    )}
                  </select>
                </div>
                <div className="chefProfileUpdateA">
                  <select
                    value={updateFavDes}
                    onChange={(e) => setUpdateFavDes(e.target.value)}
                  >
                    <option value="" disabled={true} selected>
                      Favorite Dessert
                    </option>
                    {userRecipes.map((recipe) =>
                      recipe.category === "Dessert" ? (
                        <option>{recipe.name}</option>
                      ) : (
                        <></>
                      )
                    )}
                  </select>
                  <select
                    value={updateFavCui}
                    onChange={(e) => setUpdateFavCui(e.target.value)}
                  >
                    <option value="" disabled={true} selected>
                      Favorite Cuisine
                    </option>
                    {dataList.cuisine.map((cuisine) => (
                      <option>{cuisine}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="chefProfileSub">
                <button onClick={() => updateProfile()}>Update</button>
              </div>
            </div>
            <div>
              {currentUser.userID === profileUser.userID ? (
                <button onClick={() => settingsFlip()}>
                  <EditOutlinedIcon />
                </button>
              ) : (
                <></>
              )}
            </div>
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

      <div className="userProfilePageMain">
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
              <h2>You have no Recipes. Add and share some of your recipes!!</h2>
            </div>
          )}
        </div>

        {/* USERS BOOKMARKED */}
        <div className="userBookmarked" id="userBookmarked">
          {userBookmarked.length > 0 ? (
            <>
              {userBookmarked.map((recipe) => (
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
              <h2>You don't have any recipes bookmarked.</h2>
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
              <h2>
                You have no reviews!! Check out some recipes and share you
                thoughts!!
              </h2>
            </div>
          )}
        </div>

        {/* ALL FOLLOWERS */}
        <div className="usersFollowers" id="usersFollowers">
          {chefFollowers.length > 0 ? (
            <>
              {chefFollowers.map((chef) => (
                <div className="followingProfile">
                  <div className="followingIcon">
                    <div className="followingImg" />
                  </div>
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

        {/* ALL CHEFS USER IS FOLLOWING */}
        <div className="usersFollowing" id="usersFollowing">
          {chefsFollowing.length > 0 ? (
            <>
              {chefsFollowing.map((chef) => (
                <div className="followingProfile">
                  <div className="followingIcon">
                    <div className="followingImg" />
                  </div>
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
  );
};

export default UserProfile;

import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import RecipeCard from "../RecipeCard";

import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";

const UserProfile = ({ isLoggedIn, currentUser }) => {
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
    document.getElementById("userRecipes").style.display = "flex";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("userFollowers").style.display = "none";
    document.getElementById("userFollowing").style.display = "none";

    document.getElementById("userRecipes").scrollIntoView();
  };

  const myFavorite = () => {
    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "flex";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("userFollowers").style.display = "none";
    document.getElementById("userFollowing").style.display = "none";

    document.getElementById("userBookmarked").scrollIntoView();
  };

  const myReviews = () => {
    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "flex";
    document.getElementById("userFollowers").style.display = "none";
    document.getElementById("userFollowing").style.display = "none";

    document.getElementById("userReviews").scrollIntoView();
  };

  const myFollowers = () => {
    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("userFollowers").style.display = "flex";
    document.getElementById("userFollowing").style.display = "none";

    document.getElementById("userFollowers").scrollIntoView();
  };

  const imFollowing = () => {
    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("userFollowers").style.display = "none";
    document.getElementById("userFollowing").style.display = "flex";

    document.getElementById("userFollowing").scrollIntoView();
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
    Axios.put(
      `https://mmmbook-vertwo-server.herokuapp.com/updateUser/${userID}`,
      {
        firstName: updateFirst,
        lastName: updateLast,
        username: updateUser,
        email: updateEmail,
        favRecipe: updateFavRec,
        favBeverage: updateFavBev,
        favDessert: updateFavDes,
        favCuisine: updateFavCui,
        chefDesc: updateDesc,
      }
    ).then((response) => {
      console.log(response);
    });
  };

  const deleteRecipe = (recipeID) => {
    Axios.delete(`http://localhost:3001/deleteRecipes/${recipeID}`, {}).then(
      (response) => {
        // console.log(response);
        Axios.get(`http://localhost:3001/getAllRecipesID/${userID}`, {}).then(
          (response) => {
            // console.log("hello");
            // console.log(response.data);
            setUserRecipes(response.data.reverse());
          }
        );
      }
    );
  };

  useEffect(() => {
    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getUser/${userID}`,
      {}
    ).then((response) => {
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
    });

    Axios.get(`http://localhost:3001/getAllRecipesID/${userID}`, {}).then(
      (response) => {
        // console.log("hello");
        // console.log(response.data);
        setUserRecipes(response.data.reverse());
      }
    );

    Axios.get(`http://localhost:3001/getBookmarked/${userID}`, {}).then(
      (response) => {
        // console.log(response.data);
        setUserBookmarked(response.data.reverse());
      }
    );

    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getAllReviewsID/${userID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setUserReviews(response.data.reverse());
    });
    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/allFollowing/${userID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setChefsFollowing(response.data.reverse());
    });

    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/allFollowers/${userID}`,
      {}
    ).then((response) => {
      // console.log(response);
      setChefFollowers(response.data.reverse());
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
                  <>
                    <RecipeCard
                      userRecipe={recipe}
                      type={"update"}
                      deleteRecipe={deleteRecipe}
                    />
                  </>
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
                {userBookmarked.map((favRecipe) => (
                  <RecipeCard favRecipe={favRecipe} />
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
    </div>
  );
};

export default UserProfile;

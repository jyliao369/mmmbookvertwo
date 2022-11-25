import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import RecipeCard from "../RecipeCard";
import ProfileCard from "../ProfileCard";

import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";

const UserProfile = ({ isLoggedIn, currentUser }) => {
  let { userID } = useParams();

  const [profileUser, setProfileUser] = useState([]);

  const [userRecipes, setUserRecipes] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [userBookmarked, setUserBookmarked] = useState([]);
  const [chefsFollowing, setChefsFollowing] = useState([]);
  const [chefFollowers, setChefFollowers] = useState([]);

  const [settingToggle, setSettingToggle] = useState(false);

  const [updateUser, setUpdateUser] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [updateFirst, setUpdateFirst] = useState("");
  const [updateLast, setUpdateLast] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePass, setUpdatePass] = useState("");
  const [updateRePass, setUpdateRePass] = useState("");
  const [updateFavRec, setUpdateFavRec] = useState("");
  const [favRecipeImage, setFavRecipeImage] = useState("");
  const [updateFavBev, setUpdateFavBev] = useState("");
  const [favBeverageImage, setFavBeverageImage] = useState("");
  const [updateFavDes, setUpdateFavDes] = useState("");
  const [favDessertImage, setFavDessertImage] = useState("");
  const [updateFavCui, setUpdateFavCui] = useState("");

  const myRecipes = () => {
    document.getElementById("userRecipes").style.display = "flex";
    document.getElementById("userBookmarked").style.display = "none";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("userFollowers").style.display = "none";
    document.getElementById("userFollowing").style.display = "none";

    document.getElementById("userRecipesTop").scrollIntoView();
  };

  const myFavorite = () => {
    document.getElementById("userRecipes").style.display = "none";
    document.getElementById("userBookmarked").style.display = "flex";
    document.getElementById("userReviews").style.display = "none";
    document.getElementById("userFollowers").style.display = "none";
    document.getElementById("userFollowing").style.display = "none";

    document.getElementById("userBookmarkedTop").scrollIntoView();
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
    if (settingToggle) {
      Axios.get(
        `https://mmmbook-vertwo-server.herokuapp.com/getUser/${userID}`,
        {}
      ).then((response) => {
        console.log(response.data[0]);
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

      setFavRecipeImage("");
      setFavBeverageImage("");
      setFavDessertImage("");
      setSettingToggle(!settingToggle);
    } else if (!settingToggle) {
      console.log("updating profile");
      setSettingToggle(!settingToggle);
    }
  };

  const updateInfo = (type, info) => {
    if (type === "favRecipe") {
      console.log("fav recipe");
      setUpdateFavRec(info.split(",")[0]);
      setFavRecipeImage(info.split(",")[1]);
    } else if (type === "favBeverage") {
      console.log("fav beverage");
      setUpdateFavBev(info.split(",")[0]);
      setFavBeverageImage(info.split(",")[1]);
    } else if (type === "favDessert") {
      console.log("fav dessert");
      setUpdateFavDes(info.split(",")[0]);
      setFavDessertImage(info.split(",")[1]);
    } else if (type === "favCuisine") {
      console.log("fav cuisine");
      setUpdateFavCui(info.split(",")[0]);
    }
  };

  const updateProfile = () => {
    console.log("yo");
    console.log(updateFirst);
    console.log(updateLast);
    console.log(updateUser);
    console.log(updateEmail);
    console.log(updateFavRec.split(",")[0]);
    setFavRecipeImage(updateFavRec.split(",")[1]);
    console.log(updateFavBev.split(",")[0]);
    setFavBeverageImage(updateFavBev.split(",")[1]);
    console.log(updateFavDes.split(",")[0]);
    setFavDessertImage(updateFavDes.split(",")[1]);
    console.log(updateFavCui);
    console.log(updateDesc);

    // Axios.put(
    //   `https://mmmbook-vertwo-server.herokuapp.com/updateUser/${userID}`,
    //   {
    //     firstName: updateFirst,
    //     lastName: updateLast,
    //     username: updateUser,
    //     email: updateEmail,
    //     favRecipe: updateFavRec,
    //     favBeverage: updateFavBev,
    //     favDessert: updateFavDes,
    //     favCuisine: updateFavCui,
    //     chefDesc: updateDesc,
    //   }
    // ).then((response) => {
    //   console.log(response);
    // });
  };

  const deleteRecipe = (recipeID) => {
    // console.log(recipeID);
    // Axios.delete(
    //   `https://mmmbook-vertwo-server.herokuapp.com/deleteRecipes/${recipeID}`,
    //   {}
    // ).then((response) => {
    //   // console.log(response);
    //   Axios.get(
    //     `https://mmmbook-vertwo-server.herokuapp.com/getAllRecipesID/${userID}`,
    //     {}
    //   ).then((response) => {
    //     // console.log("hello");
    //     // console.log(response.data);
    //     setUserRecipes(response.data.reverse());
    //   });
    //   Axios.delete(
    //     `http://localhost:3001/deleteAllBookmarks/${recipeID}`,
    //     {}
    //   ).then((response) => {
    //     console.log(response);
    //   });
    // });
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getUser/${userID}`,
      {}
    ).then((response) => {
      console.log(response.data[0]);
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

    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getAllRecipesID/${userID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
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
      <div>
        <ProfileCard
          isLoggedIn={isLoggedIn}
          profileUser={profileUser}
          userRecipes={userRecipes}
          settingToggle={settingToggle}
          settingsFlip={settingsFlip}
          updateInfo={updateInfo}
          updateProfile={updateProfile}
          updateUser={updateUser}
          setUpdateUser={setUpdateUser}
          updateDesc={updateDesc}
          setUpdateDesc={setUpdateDesc}
          updateFirst={updateFirst}
          setUpdateFirst={setUpdateFirst}
          updateLast={updateLast}
          setUpdateLast={setUpdateLast}
          updateFavRec={updateFavRec}
          favRecipeImage={favRecipeImage}
          updateFavBev={updateFavBev}
          favBeverageImage={favBeverageImage}
          updateFavDes={updateFavDes}
          favDessertImage={favDessertImage}
          updateFavCui={updateFavCui}
          myRecipes={myRecipes}
          myFavorite={myFavorite}
          myReviews={myReviews}
          myFollowers={myFollowers}
          imFollowing={imFollowing}
        />
      </div>

      <div id="userRecipesTop" />
      <div id="userBookmarkedTop" />
      <div id="userReviewsTop" />
      <div id="userFollowersTop" />
      <div id="userFollowingTop" />

      <br />
      <br />
      <br />

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
                      currentUser={currentUser}
                      isLoggedIn={isLoggedIn}
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
                  <RecipeCard
                    favRecipe={favRecipe}
                    currentUser={currentUser}
                    isLoggedIn={isLoggedIn}
                  />
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

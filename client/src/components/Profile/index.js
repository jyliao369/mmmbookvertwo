import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import RecipeCard from "../RecipeCard";
import ProfileCard from "../ProfileCard";

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

    // console.log(chefUserID + " " + chefUsername);
    // console.log(currentUser.username);

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
        if (response.data.isLoggedIn === true) {
          Axios.get(
            `https://mmmbook-vertwo-server.herokuapp.com/test/${response.data.user[0].userID},${userID}`,
            {}
          ).then((response) => {
            console.log(response.data.following);
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
      <ProfileCard
        isLoggedIn={isLoggedIn}
        profileUser={profileUser}
        followUsers={"true"}
        followUser={followUser}
        myRecipes={myRecipes}
        myFavorite={myFavorite}
        myReviews={myReviews}
        myFollowers={myFollowers}
        imFollowing={imFollowing}
        isFollowing={isFollowing}
      />

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
    </div>
  );
};

export default Profile;

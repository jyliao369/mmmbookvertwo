import React from "react";

import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import EmailIcon from "@mui/icons-material/Email";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const ProfileCard = ({
  isLoggedIn,
  profileUser,
  followUsers,
  followUser,
  myFavorite,
  myRecipes,
  myReviews,
  myFollowers,
  imFollowing,
  isFollowing,
}) => {
  return (
    <div className="chefProfileCardCont">
      <div className="chefProfileCard">
        <div className="chefProfileCardA">
          <div className="chefProfileImage" />
          <div className="chefProfileInfo">
            <h2 className="chefProfileInfoName">
              {profileUser.firstName} {profileUser.lastName}
            </h2>
            <div className="chefProfileInfoUsername">
              {profileUser.username}
            </div>
            <div className="chefProfileInfoDesc">
              {/* <h3>About Me</h3> */}
              <div>{profileUser.chefDesc}</div>
            </div>
            {/* <h3>"Rating"</h3> */}
            <div className="socialBar">
              <EmailIcon />
              <FacebookIcon />
              <TwitterIcon />
              <InstagramIcon />
              <YouTubeIcon />
              <PinterestIcon />
            </div>
            {followUsers ? (
              <>
                {isLoggedIn ? (
                  <button
                    className="followBtn"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      followUser([profileUser.userID, profileUser.username])
                    }
                  >
                    {isFollowing ? (
                      <>
                        <PersonRemoveIcon /> unFollow
                      </>
                    ) : (
                      <>
                        <PersonAddAlt1Icon />
                        Follow
                      </>
                    )}
                  </button>
                ) : (
                  <button className="followBtn" disabled>
                    <PersonAddAlt1Icon />
                    Follow
                  </button>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="chefProfileCardB">
          <div className="chefProfileCardBOne">
            <div>
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
            {/* <div className="chefProfileCardBStats">
                <div>
                  <h3>Dishes Created:</h3>
                </div>
                <div>
                  <h3>Drinks Created:</h3>
                  <p>"Number"</p>
                </div>
                <div>
                  <h3>Recipes Cooked:</h3>
                  <p>"Number"</p>
                </div>
              </div> */}
          </div>
          <div className="chefProfileNavBar">
            <div style={{ cursor: "pointer" }} onClick={() => myRecipes()}>
              My Recipes
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => myFavorite()}>
              My Favorites
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => myReviews()}>
              My Reviews
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => myFollowers()}>
              Followers
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => imFollowing()}>
              Following
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

import React from "react";
import { Image } from "cloudinary-react";
import { useState } from "react";

import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import EmailIcon from "@mui/icons-material/Email";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import * as dataList from "../data";

const ProfileCard = ({
  isLoggedIn,
  profileUser,
  userRecipes,
  followUsers,
  followUser,
  settingToggle,
  settingsFlip,
  updateInfo,
  updateProfile,
  updateUser,
  setUpdateUser,
  updateDesc,
  setUpdateDesc,
  updateFirst,
  setUpdateFirst,
  updateLast,
  setUpdateLast,
  updateFavRec,
  favRecipeImage,
  updateFavBev,
  favBeverageImage,
  updateFavDes,
  favDessertImage,
  updateFavCui,
  myRecipes,
  myFavorite,
  myReviews,
  myFollowers,
  imFollowing,
  isFollowing,
}) => {
  return (
    <div className="chefProfileCardCont">
      <div className="chefProfileCard" id="chefProfileCard">
        <div className="chefProfileCardA">
          <div className="chefProfileImage" />
          <div className="chefProfileInfo">
            <div className="chefProfileInfoName">
              {settingToggle ? (
                <>
                  <input
                    value={updateFirst}
                    onChange={(event) => setUpdateFirst(event.target.value)}
                    placeholder="First Name"
                  />
                  <input
                    value={updateLast}
                    onChange={(event) => setUpdateLast(event.target.value)}
                    placeholder="Last Name"
                  />
                </>
              ) : (
                <h2>
                  {updateFirst} {updateLast}
                </h2>
              )}
            </div>
            <div className="chefProfileInfoUsername">
              {settingToggle ? (
                <input
                  value={updateUser}
                  onChange={(event) => setUpdateUser(event.target.value)}
                  placeholder="Username"
                />
              ) : (
                <h3>{updateUser}</h3>
              )}
            </div>
            <div className="chefProfileInfoDesc">
              {settingToggle ? (
                <textarea
                  value={updateDesc}
                  onChange={(event) => setUpdateDesc(event.target.value)}
                  placeholder="Description"
                />
              ) : (
                <p>{updateDesc}</p>
              )}
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
              <div>
                {settingToggle ? (
                  <>
                    <button onClick={() => settingsFlip()}>Undo</button>
                    <button onClick={() => updateProfile()}>Update</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => settingsFlip()}>Setting</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="chefProfileCardB">
          <div className="chefProfileCardBOne">
            <div className="chefProfileCardBInfo">
              <div className="chefProfileCardBInfoA">
                <h3>Favorite Recipe: </h3>
                {settingToggle ? (
                  <>
                    <select
                      onChange={(e) => updateInfo("favRecipe", e.target.value)}
                    >
                      <option>None</option>
                      {userRecipes.map((recipe) => (
                        <option value={[recipe.name, recipe.recipeImageID]}>
                          {recipe.name}
                        </option>
                      ))}
                    </select>
                    <div className="favRecipeImages">
                      {favRecipeImage ? (
                        <>
                          <Image
                            cloudName="du119g90a"
                            public_id={favRecipeImage}
                          />
                        </>
                      ) : (
                        <>
                          <Image
                            cloudName="du119g90a"
                            public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                          />
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <p>{updateFavRec}</p>
                    <div className="favRecipeImages">
                      {favDessertImage ? (
                        <>
                          <Image
                            cloudName="du119g90a"
                            public_id={favDessertImage}
                          />
                        </>
                      ) : (
                        <>
                          <Image
                            cloudName="du119g90a"
                            public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                          />
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="chefProfileCardBInfoA">
                <h3>Favorite Beverage: </h3>
                {settingToggle ? (
                  <>
                    <select
                      onChange={(e) =>
                        updateInfo("favBeverage", e.target.value)
                      }
                    >
                      <option>None</option>
                      {userRecipes.map((recipe) => (
                        <option value={[recipe.name, recipe.recipeImageID]}>
                          {recipe.name}
                        </option>
                      ))}
                    </select>
                    <div className="favRecipeImages">
                      {favBeverageImage ? (
                        <>
                          <Image
                            cloudName="du119g90a"
                            public_id={favBeverageImage}
                          />
                        </>
                      ) : (
                        <>
                          <Image
                            cloudName="du119g90a"
                            public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                          />
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <p>{updateFavBev}</p>
                    <div className="favRecipeImages">
                      {favDessertImage ? (
                        <>
                          <Image
                            cloudName="du119g90a"
                            public_id={favDessertImage}
                          />
                        </>
                      ) : (
                        <>
                          <Image
                            cloudName="du119g90a"
                            public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                          />
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="chefProfileCardBInfo">
              <div className="chefProfileCardBInfoA">
                <h3>Favorite Dessert: </h3>
                {settingToggle ? (
                  <>
                    <select
                      onChange={(e) => updateInfo("favDessert", e.target.value)}
                    >
                      <option>None</option>
                      {userRecipes.map((recipe) => (
                        <option value={[recipe.name, recipe.recipeImageID]}>
                          {recipe.name}
                        </option>
                      ))}
                    </select>
                    <div className="favRecipeImages">
                      {favDessertImage ? (
                        <>
                          <Image
                            cloudName="du119g90a"
                            public_id={favDessertImage}
                          />
                        </>
                      ) : (
                        <>
                          <Image
                            cloudName="du119g90a"
                            public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                          />
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <p>{updateFavDes}</p>
                    <div className="favRecipeImages">
                      {favDessertImage ? (
                        <>
                          <Image
                            cloudName="du119g90a"
                            public_id={favDessertImage}
                          />
                        </>
                      ) : (
                        <>
                          <Image
                            cloudName="du119g90a"
                            public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                          />
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="chefProfileCardBInfoA">
                <h3>Favorite Cuisine: </h3>
                {settingToggle ? (
                  <div>
                    <select
                      onChange={(e) => updateInfo("favCuisine", e.target.value)}
                    >
                      <option>None</option>
                      {dataList.cuisine.map((cuisine) => (
                        <option value={cuisine}>{cuisine}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>
                    <p>{updateFavCui}</p>
                  </>
                )}
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

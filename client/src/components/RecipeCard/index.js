import React from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useState } from "react";
import Axios from "axios";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import BreakfastDiningRoundedIcon from "@mui/icons-material/BreakfastDiningRounded";
import CookieRoundedIcon from "@mui/icons-material/CookieRounded";
import LocalBarRoundedIcon from "@mui/icons-material/LocalBarRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import RamenDiningRoundedIcon from "@mui/icons-material/RamenDiningRounded";
import RoomServiceRoundedIcon from "@mui/icons-material/RoomServiceRounded";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const RecipeCard = ({
  recipe,
  userRecipe,
  favRecipe,
  currentUser,
  type,
  deleteRecipe,
  isLoggedIn,
}) => {
  const moreInfo = (event, type, recipeInfo) => {
    if (type === "ingIns") {
      if (
        document.getElementById(`${recipeInfo}a`).style.display === "" ||
        document.getElementById(`${recipeInfo}a`).style.display === "block"
      ) {
        document.getElementById(`${recipeInfo}a`).style.display = "none";
        document.getElementById(`${recipeInfo}b`).style.display = "block";
      } else if (
        document.getElementById(`${recipeInfo}a`).style.display === "none"
      ) {
        document.getElementById(`${recipeInfo}a`).style.display = "block";
        document.getElementById(`${recipeInfo}b`).style.display = "none";
      }
    } else if (type === "recipeDesc") {
      if (
        document.getElementById(`${recipeInfo}A`).style.display === "" ||
        document.getElementById(`${recipeInfo}A`).style.display === "flex"
      ) {
        document.getElementById(`${recipeInfo}A`).style.display = "none";
        document.getElementById(`${recipeInfo}B`).style.display = "flex";
      } else if (
        document.getElementById(`${recipeInfo}A`).style.display === "none"
      ) {
        document.getElementById(`${recipeInfo}A`).style.display = "flex";
        document.getElementById(`${recipeInfo}B`).style.display = "none";
      }
    }
  };

  const showInfo = (event, type) => {
    if (type === "close") {
      event.currentTarget.parentElement.children[1].style.opacity = 0;
    } else {
      event.currentTarget.parentElement.children[1].style.opacity = 1;
    }
  };

  const createViews = (recipeID) => {
    // console.log(isLoggedIn);
    if (isLoggedIn) {
      Axios.post(
        `http://localhost:3001/createViews/${recipeID},${currentUser.userID},${currentUser.username}`,
        {}
      ).then((response) => {
        // console.log(response);
      });
    } else {
      console.log("you are not logged in cant create a view");
    }
  };

  return (
    <div className="recipeCard">
      {favRecipe ? (
        <>
          <div className="recipeCardA" id={`recipeCard${favRecipe.recipeID}a`}>
            <div className="recipeCardMainInfo">
              <Link to={`/recipe/${favRecipe.recipeID}`}>
                <div
                  onClick={() => createViews(favRecipe.recipeID)}
                  className="recipeImage"
                >
                  {favRecipe.recipeImageID === "" ||
                  favRecipe.recipeImageID === null ? (
                    <Image
                      cloudName="du119g90a"
                      public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                    ></Image>
                  ) : (
                    <Image
                      cloudName="du119g90a"
                      public_id={favRecipe.recipeImageID}
                    ></Image>
                  )}
                  <div className="recipeInfoCont">
                    <div className="recipeInfoTitle">
                      <h3>{favRecipe.name}</h3>
                    </div>
                    <div
                      className="recipeInfoStatsCont"
                      id="recipeInfoStatsCont"
                    >
                      {/* <div className="recipeBookmarks">
                        <FavoriteOutlinedIcon />
                        <p>{favRecipe.totalBookmarks}</p>
                      </div> */}
                      <div className="recipeLikes">
                        <StarRoundedIcon />
                        <p>{favRecipe.totalLikes}</p>
                      </div>
                      <div className="recipeReviews">
                        <ForumRoundedIcon />
                        <p>{favRecipe.totalReviews}</p>
                      </div>
                      <div className="recipeViews">
                        <VisibilityRoundedIcon />
                        <p>{favRecipe.totalViews}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="recipeInfo">
                <div
                  className="recipeInfoA"
                  id={`recipeInfo${favRecipe.recipeID}A`}
                >
                  <div className="recipeInfoAb">
                    <div className="recipeInfoAc">
                      <div
                        onMouseEnter={(event) => showInfo(event, "open")}
                        onMouseLeave={(event) => showInfo(event, "close")}
                      >
                        <BrunchDiningIcon />
                        <h5>Category: </h5>
                      </div>
                      <p>{favRecipe.category}</p>
                    </div>
                    <div className="recipeInfoAc">
                      <div
                        onMouseEnter={(event) => showInfo(event, "open")}
                        onMouseLeave={(event) => showInfo(event, "close")}
                      >
                        <DinnerDiningIcon />
                        <h5>Course: </h5>
                      </div>
                      <p>{favRecipe.course}</p>
                    </div>
                    <div className="recipeInfoAc">
                      <div
                        onMouseEnter={(event) => showInfo(event, "open")}
                        onMouseLeave={(event) => showInfo(event, "close")}
                      >
                        <RamenDiningIcon />
                        <h5>Cuisine: </h5>
                      </div>
                      <p>{favRecipe.cuisine}</p>
                    </div>
                    <div className="recipeInfoAc">
                      <div
                        onMouseEnter={(event) => showInfo(event, "open")}
                        onMouseLeave={(event) => showInfo(event, "close")}
                      >
                        <MenuBookIcon />
                        <h5>Diet: </h5>
                      </div>
                      <p>{favRecipe.diet}</p>
                    </div>
                    <div className="recipeInfoAc">
                      <div
                        onMouseEnter={(event) => showInfo(event, "open")}
                        onMouseLeave={(event) => showInfo(event, "close")}
                      >
                        <LocalDiningIcon />
                        <h5>Yield: </h5>
                      </div>
                      <p>{favRecipe.yield}</p>
                    </div>
                    <div className="recipeInfoAc">
                      <div
                        onMouseEnter={(event) => showInfo(event, "open")}
                        onMouseLeave={(event) => showInfo(event, "close")}
                      >
                        <RoomServiceIcon />
                        <h5>Servings: </h5>
                      </div>
                      <p>{favRecipe.servings}</p>
                    </div>
                    <div className="recipeInfoAc">
                      <div
                        onMouseEnter={(event) => showInfo(event, "open")}
                        onMouseLeave={(event) => showInfo(event, "close")}
                      >
                        <HourglassEmptyIcon />
                        <h5>Prep: </h5>
                      </div>
                      <p>{favRecipe.prepTime} min</p>
                    </div>
                    <div className="recipeInfoAc">
                      <div
                        onMouseEnter={(event) => showInfo(event, "open")}
                        onMouseLeave={(event) => showInfo(event, "close")}
                      >
                        <AccessAlarmsIcon />
                        <h5>Cook: </h5>
                      </div>
                      <p>{favRecipe.cookTime} min</p>
                    </div>
                    <div className="recipeInfoAc">
                      <div
                        onMouseEnter={(event) => showInfo(event, "open")}
                        onMouseLeave={(event) => showInfo(event, "close")}
                      >
                        <AccessTimeIcon />
                        <h5>Total: </h5>
                      </div>
                      <p>{favRecipe.totalTime} min</p>
                    </div>
                  </div>
                </div>
                <div
                  className="recipeInfoB"
                  id={`recipeInfo${favRecipe.recipeID}B`}
                >
                  <div className="recipeInfoDesc">
                    <h3>Description:</h3>
                    <p>{favRecipe.description}</p>
                  </div>
                  <div className="recipeInfoPoster">
                    <Link to={`/profile/${favRecipe.userID}`}>
                      <PersonOutlineOutlinedIcon />
                    </Link>
                    <p>{favRecipe.username} on "date"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="recipeCardB" id={`recipeCard${favRecipe.recipeID}b`}>
            <div className="recipeCardIngIns">
              <div className="recipeCardIngCont">
                <h3>Ingredients</h3>
                <div className="recipeCardIng">
                  {favRecipe.ingredients.split("\n").map((ingredient) => (
                    <p>{ingredient}</p>
                  ))}
                </div>
              </div>
              <div className="recipeCardInsCont">
                <h3>Instructions</h3>
                <div className="recipeCardIns">
                  {favRecipe.instructions.split("\n").map((instruction) => (
                    <p>{instruction}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="recipeCardC">
            <div className="recipeInfoMore">
              <button
                style={{ cursor: "pointer" }}
                onClick={(event) =>
                  moreInfo(event, "ingIns", `recipeCard${favRecipe.recipeID}`)
                }
              >
                <FeedOutlinedIcon />
              </button>
              <button
                style={{ cursor: "pointer" }}
                onClick={(event) =>
                  moreInfo(
                    event,
                    "recipeDesc",
                    `recipeInfo${favRecipe.recipeID}`
                  )
                }
              >
                <InfoOutlinedIcon />
              </button>
              <button>
                <Link to={`/customize/${favRecipe.recipeID}`}>
                  <AutoFixHighRoundedIcon />
                </Link>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {userRecipe ? (
            <>
              <div
                className="recipeCardA"
                id={`recipeCard${userRecipe.recipeID}a`}
              >
                <div className="recipeCardMainInfo">
                  <Link to={`/recipe/${userRecipe.recipeID}`}>
                    <div
                      onClick={() => createViews(userRecipe.recipeID)}
                      className="recipeImage"
                    >
                      {userRecipe.recipeImageID === "" ||
                      userRecipe.recipeImageID === null ? (
                        <Image
                          cloudName="du119g90a"
                          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                        ></Image>
                      ) : (
                        <Image
                          cloudName="du119g90a"
                          public_id={userRecipe.recipeImageID}
                        ></Image>
                      )}
                      <div className="recipeInfoCont">
                        <div className="recipeInfoTitle">
                          <h3>{userRecipe.name}</h3>
                        </div>
                        <div
                          className="recipeInfoStatsCont"
                          id="recipeInfoStatsCont"
                        >
                          {/* <div className="recipeBookmarks">
                            <FavoriteOutlinedIcon />
                            <p>{userRecipe.totalBookmarks}</p>
                          </div> */}
                          <div className="recipeLikes">
                            <StarRoundedIcon />
                            <p>{userRecipe.totalLikes}</p>
                          </div>
                          <div className="recipeReviews">
                            <ForumRoundedIcon />
                            <p>{userRecipe.totalReviews}</p>
                          </div>
                          <div className="recipeViews">
                            <VisibilityRoundedIcon />
                            <p>{userRecipe.totalViews}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="recipeInfo">
                    <div
                      className="recipeInfoA"
                      id={`recipeInfo${userRecipe.recipeID}A`}
                    >
                      <div className="recipeInfoAb">
                        <div className="recipeInfoAc">
                          <div
                            onMouseEnter={(event) => showInfo(event, "open")}
                            onMouseLeave={(event) => showInfo(event, "close")}
                          >
                            <BrunchDiningIcon />
                            <h5>Category: </h5>
                          </div>
                          <p>{userRecipe.category}</p>
                        </div>
                        <div className="recipeInfoAc">
                          <div
                            onMouseEnter={(event) => showInfo(event, "open")}
                            onMouseLeave={(event) => showInfo(event, "close")}
                          >
                            <DinnerDiningIcon />
                            <h5>Course: </h5>
                          </div>
                          <p>{userRecipe.course}</p>
                        </div>
                        <div className="recipeInfoAc">
                          <div
                            onMouseEnter={(event) => showInfo(event, "open")}
                            onMouseLeave={(event) => showInfo(event, "close")}
                          >
                            <RamenDiningIcon />
                            <h5>Cuisine: </h5>
                          </div>
                          <p>{userRecipe.cuisine}</p>
                        </div>
                        <div className="recipeInfoAc">
                          <div
                            onMouseEnter={(event) => showInfo(event, "open")}
                            onMouseLeave={(event) => showInfo(event, "close")}
                          >
                            <MenuBookIcon />
                            <h5>Diet: </h5>
                          </div>
                          <p>{userRecipe.diet}</p>
                        </div>
                        <div className="recipeInfoAc">
                          <div
                            onMouseEnter={(event) => showInfo(event, "open")}
                            onMouseLeave={(event) => showInfo(event, "close")}
                          >
                            <LocalDiningIcon />
                            <h5>Yield: </h5>
                          </div>
                          <p>{userRecipe.yield}</p>
                        </div>
                        <div className="recipeInfoAc">
                          <div
                            onMouseEnter={(event) => showInfo(event, "open")}
                            onMouseLeave={(event) => showInfo(event, "close")}
                          >
                            <RoomServiceIcon />
                            <h5>Servings: </h5>
                          </div>
                          <p>{userRecipe.servings}</p>
                        </div>
                        <div className="recipeInfoAc">
                          <div
                            onMouseEnter={(event) => showInfo(event, "open")}
                            onMouseLeave={(event) => showInfo(event, "close")}
                          >
                            <HourglassEmptyIcon />
                            <h5>Prep: </h5>
                          </div>
                          <p>{userRecipe.prepTime} min</p>
                        </div>
                        <div className="recipeInfoAc">
                          <div
                            onMouseEnter={(event) => showInfo(event, "open")}
                            onMouseLeave={(event) => showInfo(event, "close")}
                          >
                            <AccessAlarmsIcon />
                            <h5>Cook: </h5>
                          </div>
                          <p>{userRecipe.cookTime} min</p>
                        </div>
                        <div className="recipeInfoAc">
                          <div
                            onMouseEnter={(event) => showInfo(event, "open")}
                            onMouseLeave={(event) => showInfo(event, "close")}
                          >
                            <AccessTimeIcon />
                            <h5>Total: </h5>
                          </div>
                          <p>{userRecipe.totalTime} min</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="recipeInfoB"
                      id={`recipeInfo${userRecipe.recipeID}B`}
                    >
                      <div className="recipeInfoDesc">
                        <h3>Description:</h3>
                        <p>{userRecipe.description}</p>
                      </div>
                      <div className="recipeInfoPoster">
                        <Link to={`/profile/${userRecipe.userID}`}>
                          <PersonOutlineOutlinedIcon />
                        </Link>
                        <p>{userRecipe.username} on "date"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="recipeCardB"
                id={`recipeCard${userRecipe.recipeID}b`}
              >
                <div className="recipeCardIngIns">
                  <div className="recipeCardIngCont">
                    <h3>Ingredients</h3>
                    <div className="recipeCardIng">
                      {userRecipe.ingredients.split("\n").map((ingredient) => (
                        <p>{ingredient}</p>
                      ))}
                    </div>
                  </div>
                  <div className="recipeCardInsCont">
                    <h3>Instructions</h3>
                    <div className="recipeCardIns">
                      {userRecipe.instructions
                        .split("\n")
                        .map((instruction) => (
                          <p>{instruction}</p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="recipeCardC">
                <div className="recipeInfoMore">
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={(event) =>
                      moreInfo(
                        event,
                        "ingIns",
                        `recipeCard${userRecipe.recipeID}`
                      )
                    }
                  >
                    <FeedOutlinedIcon />
                  </button>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={(event) =>
                      moreInfo(
                        event,
                        "recipeDesc",
                        `recipeInfo${userRecipe.recipeID}`
                      )
                    }
                  >
                    <InfoOutlinedIcon />
                  </button>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteRecipe(userRecipe.recipeID)}
                  >
                    <DeleteForeverRoundedIcon />
                  </button>
                  <button>
                    <Link to={`/update/${userRecipe.recipeID}`}>
                      <EditRoundedIcon />
                    </Link>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {recipe ? (
                <>
                  <div
                    className="recipeCardA"
                    id={`recipeCard${recipe.recipeID}a`}
                  >
                    <div className="recipeCardMainInfo">
                      <Link to={`/recipe/${recipe.recipeID}`}>
                        <div
                          onClick={() => createViews(recipe.recipeID)}
                          className="recipeImage"
                        >
                          {recipe.recipeImageID === "" ||
                          recipe.recipeImageID === null ? (
                            <Image
                              cloudName="du119g90a"
                              public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                            ></Image>
                          ) : (
                            <Image
                              cloudName="du119g90a"
                              public_id={recipe.recipeImageID}
                            ></Image>
                          )}
                          <div className="recipeInfoCont">
                            <div className="recipeInfoTitle">
                              <h3>{recipe.name}</h3>
                            </div>
                            <div
                              className="recipeInfoStatsCont"
                              id="recipeInfoStatsCont"
                            >
                              {/* <div className="recipeBookmarks">
                                <FavoriteOutlinedIcon />
                                <p>{recipe.totalBookmarks}</p>
                              </div> */}
                              <div className="recipeLikes">
                                <StarRoundedIcon />
                                <p>{recipe.totalLikes}</p>
                              </div>
                              <div className="recipeReviews">
                                <ForumRoundedIcon />
                                <p>{recipe.totalReviews}</p>
                              </div>
                              <div className="recipeViews">
                                <VisibilityRoundedIcon />
                                <p>{recipe.totalViews}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="recipeInfo">
                        <div
                          className="recipeInfoA"
                          id={`recipeInfo${recipe.recipeID}A`}
                        >
                          <div className="recipeInfoAb">
                            <div className="recipeInfoAc">
                              <div
                                onMouseEnter={(event) =>
                                  showInfo(event, "open")
                                }
                                onMouseLeave={(event) =>
                                  showInfo(event, "close")
                                }
                              >
                                <BrunchDiningIcon />
                                <h5>Category: </h5>
                              </div>
                              <p>{recipe.category}</p>
                            </div>
                            <div className="recipeInfoAc">
                              <div
                                onMouseEnter={(event) =>
                                  showInfo(event, "open")
                                }
                                onMouseLeave={(event) =>
                                  showInfo(event, "close")
                                }
                              >
                                <DinnerDiningIcon />
                                <h5>Course: </h5>
                              </div>
                              <p>{recipe.course}</p>
                            </div>
                            <div className="recipeInfoAc">
                              <div
                                onMouseEnter={(event) =>
                                  showInfo(event, "open")
                                }
                                onMouseLeave={(event) =>
                                  showInfo(event, "close")
                                }
                              >
                                <RamenDiningIcon />
                                <h5>Cuisine: </h5>
                              </div>
                              <p>{recipe.cuisine}</p>
                            </div>
                            <div className="recipeInfoAc">
                              <div
                                onMouseEnter={(event) =>
                                  showInfo(event, "open")
                                }
                                onMouseLeave={(event) =>
                                  showInfo(event, "close")
                                }
                              >
                                <MenuBookIcon />
                                <h5>Diet: </h5>
                              </div>
                              <p>{recipe.diet}</p>
                            </div>
                            <div className="recipeInfoAc">
                              <div
                                onMouseEnter={(event) =>
                                  showInfo(event, "open")
                                }
                                onMouseLeave={(event) =>
                                  showInfo(event, "close")
                                }
                              >
                                <LocalDiningIcon />
                                <h5>Yield: </h5>
                              </div>
                              <p>{recipe.yield}</p>
                            </div>
                            <div className="recipeInfoAc">
                              <div
                                onMouseEnter={(event) =>
                                  showInfo(event, "open")
                                }
                                onMouseLeave={(event) =>
                                  showInfo(event, "close")
                                }
                              >
                                <RoomServiceIcon />
                                <h5>Servings: </h5>
                              </div>
                              <p>{recipe.servings}</p>
                            </div>
                            <div className="recipeInfoAc">
                              <div
                                onMouseEnter={(event) =>
                                  showInfo(event, "open")
                                }
                                onMouseLeave={(event) =>
                                  showInfo(event, "close")
                                }
                              >
                                <HourglassEmptyIcon />
                                <h5>Prep: </h5>
                              </div>
                              <p>{recipe.prepTime} min</p>
                            </div>
                            <div className="recipeInfoAc">
                              <div
                                onMouseEnter={(event) =>
                                  showInfo(event, "open")
                                }
                                onMouseLeave={(event) =>
                                  showInfo(event, "close")
                                }
                              >
                                <AccessAlarmsIcon />
                                <h5>Cook: </h5>
                              </div>
                              <p>{recipe.cookTime} min</p>
                            </div>
                            <div className="recipeInfoAc">
                              <div
                                onMouseEnter={(event) =>
                                  showInfo(event, "open")
                                }
                                onMouseLeave={(event) =>
                                  showInfo(event, "close")
                                }
                              >
                                <AccessTimeIcon />
                                <h5>Total: </h5>
                              </div>
                              <p>{recipe.totalTime} min</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="recipeInfoB"
                          id={`recipeInfo${recipe.recipeID}B`}
                        >
                          <div className="recipeInfoDesc">
                            <h3>Description:</h3>
                            <p>{recipe.description}</p>
                          </div>
                          <div className="recipeInfoPoster">
                            <Link to={`/profile/${recipe.userID}`}>
                              <PersonOutlineOutlinedIcon />
                            </Link>
                            <p>{recipe.username} on "date"</p>
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
                      <div className="recipeCardIngCont">
                        <h3>Ingredients</h3>
                        <div className="recipeCardIng">
                          {recipe.ingredients.split("\n").map((ingredient) => (
                            <p>{ingredient}</p>
                          ))}
                        </div>
                      </div>
                      <div className="recipeCardInsCont">
                        <h3>Instructions</h3>
                        <div className="recipeCardIns">
                          {recipe.instructions
                            .split("\n")
                            .map((instruction) => (
                              <p>{instruction}</p>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="recipeCardC">
                    <div className="recipeInfoMore">
                      <button
                        style={{ cursor: "pointer" }}
                        onClick={(event) =>
                          moreInfo(
                            event,
                            "ingIns",
                            `recipeCard${recipe.recipeID}`
                          )
                        }
                      >
                        <FeedOutlinedIcon />
                      </button>
                      <button
                        style={{ cursor: "pointer" }}
                        onClick={(event) =>
                          moreInfo(
                            event,
                            "recipeDesc",
                            `recipeInfo${recipe.recipeID}`
                          )
                        }
                      >
                        <InfoOutlinedIcon />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeCard;

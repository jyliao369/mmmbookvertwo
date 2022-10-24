import React from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useState } from "react";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

const RecipeCard = ({ recipe, userRecipe, favRecipe, type, deleteRecipe }) => {
  console.log("I walk alone");
  console.log(favRecipe);
  const moreInfo = (event, type, recipeInfo) => {
    if (type === "ingIns") {
      if (
        document.getElementById(`${recipeInfo}a`).style.display === "" ||
        document.getElementById(`${recipeInfo}a`).style.display === "flex"
      ) {
        document.getElementById(`${recipeInfo}a`).style.display = "none";
        document.getElementById(`${recipeInfo}b`).style.display = "flex";
      } else if (
        document.getElementById(`${recipeInfo}a`).style.display === "none"
      ) {
        document.getElementById(`${recipeInfo}a`).style.display = "flex";
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

  const ingrSplit = (ingre) => {};

  const instrSplit = (instr) => {};

  return (
    <div className="recipeCard">
      {favRecipe ? (
        <>
          <div className="recipeCardA" id={`recipeCard${favRecipe.recipeID}a`}>
            <div className="recipeCardMainInfo">
              <Link to={`/recipe/${favRecipe.recipeID}`}>
                <div className="recipeImage">
                  <div className="recipeImageCont">
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
                  </div>
                  <div className="recipeInfoCont">
                    <div className="recipeInfoTitle">
                      <h3>{favRecipe.name}</h3>
                    </div>
                    <div
                      className="recipeInfoStatsCont"
                      id="recipeInfoStatsCont"
                    >
                      <div className="recipeInfoStats">
                        <div className="recipeBookmarks">
                          <FavoriteOutlinedIcon />
                          <p>{favRecipe.totalBookmarks}</p>
                        </div>
                        <div className="recipeLikes">
                          <StarRoundedIcon />
                          <p>{favRecipe.totalLikes}</p>
                        </div>
                        <div className="recipeReviews">
                          <ForumRoundedIcon />
                          <p>{favRecipe.totalReviews}</p>
                        </div>
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
                  <div>
                    <h3>Prep Time: </h3>
                    <p>{favRecipe.prepTime} min</p>
                  </div>
                  <div>
                    <h3>Cook Time: </h3>
                    <p>{favRecipe.cookTime} min</p>
                  </div>
                  <div>
                    <h3>Total Time: </h3>
                    <p>{favRecipe.totalTime} min</p>
                  </div>
                  <div>
                    <h3>Yield: </h3>
                    <p>{favRecipe.yield}</p>
                  </div>
                  <div>
                    <h3>Servings: </h3>
                    <p>{favRecipe.servings}</p>
                  </div>
                  <div>
                    <h3>Category: </h3>
                    <p>{favRecipe.category}</p>
                  </div>
                  <div>
                    <h3>Course: </h3>
                    <p>{favRecipe.course}</p>
                  </div>
                  <div>
                    <h3>Cuisine: </h3>
                    <p>{favRecipe.cuisine}</p>
                  </div>
                  <div>
                    <h3>Diet: </h3>
                    <p>{favRecipe.diet}</p>
                  </div>
                </div>
                <div
                  className="recipeInfoB"
                  id={`recipeInfo${favRecipe.recipeID}B`}
                >
                  <h3>Description:</h3>
                  <p className="recipeInfoDesc">{favRecipe.description}</p>
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
                  {favRecipe.instructions.split(".").map((instruction) => (
                    <p>{instruction}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="recipeCardC">
            <div>
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
            </div>
            <div>
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
                    <div className="recipeImage">
                      <div className="recipeImageCont">
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
                      </div>
                      <div className="recipeInfoCont">
                        <div className="recipeInfoTitle">
                          <h3>{userRecipe.name}</h3>
                        </div>
                        <div
                          className="recipeInfoStatsCont"
                          id="recipeInfoStatsCont"
                        >
                          <div className="recipeInfoStats">
                            <div className="recipeBookmarks">
                              <FavoriteOutlinedIcon />
                              <p>{userRecipe.totalBookmarks}</p>
                            </div>
                            <div className="recipeLikes">
                              <StarRoundedIcon />
                              <p>{userRecipe.totalLikes}</p>
                            </div>
                            <div className="recipeReviews">
                              <ForumRoundedIcon />
                              <p>{userRecipe.totalReviews}</p>
                            </div>
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
                      <div>
                        <h3>Prep Time: </h3>
                        <p>{userRecipe.prepTime} min</p>
                      </div>
                      <div>
                        <h3>Cook Time: </h3>
                        <p>{userRecipe.cookTime} min</p>
                      </div>
                      <div>
                        <h3>Total Time: </h3>
                        <p>{userRecipe.totalTime} min</p>
                      </div>
                      <div>
                        <h3>Yield: </h3>
                        <p>{userRecipe.yield}</p>
                      </div>
                      <div>
                        <h3>Servings: </h3>
                        <p>{userRecipe.servings}</p>
                      </div>
                      <div>
                        <h3>Category: </h3>
                        <p>{userRecipe.category}</p>
                      </div>
                      <div>
                        <h3>Course: </h3>
                        <p>{userRecipe.course}</p>
                      </div>
                      <div>
                        <h3>Cuisine: </h3>
                        <p>{userRecipe.cuisine}</p>
                      </div>
                      <div>
                        <h3>Diet: </h3>
                        <p>{userRecipe.diet}</p>
                      </div>
                    </div>
                    <div
                      className="recipeInfoB"
                      id={`recipeInfo${userRecipe.recipeID}B`}
                    >
                      <h3>Description:</h3>
                      <p className="recipeInfoDesc">{userRecipe.description}</p>
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
                      {userRecipe.instructions.split(".").map((instruction) => (
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
                    onClick={(e) => deleteRecipe(userRecipe.recipeID)}
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
                        <div className="recipeImage">
                          <div className="recipeImageCont">
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
                          </div>
                          <div className="recipeInfoCont">
                            <div className="recipeInfoTitle">
                              <h3>{recipe.name}</h3>
                            </div>
                            <div
                              className="recipeInfoStatsCont"
                              id="recipeInfoStatsCont"
                            >
                              <div className="recipeInfoStats">
                                <div className="recipeBookmarks">
                                  <FavoriteOutlinedIcon />
                                  <p>{recipe.totalBookmarks}</p>
                                </div>
                                <div className="recipeLikes">
                                  <StarRoundedIcon />
                                  <p>{recipe.totalLikes}</p>
                                </div>
                                <div className="recipeReviews">
                                  <ForumRoundedIcon />
                                  <p>{recipe.totalReviews}</p>
                                </div>
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
                          <div>
                            <h3>Prep Time: </h3>
                            <p>{recipe.prepTime} min</p>
                          </div>
                          <div>
                            <h3>Cook Time: </h3>
                            <p>{recipe.cookTime} min</p>
                          </div>
                          <div>
                            <h3>Total Time: </h3>
                            <p>{recipe.totalTime} min</p>
                          </div>
                          <div>
                            <h3>Yield: </h3>
                            <p>{recipe.yield}</p>
                          </div>
                          <div>
                            <h3>Servings: </h3>
                            <p>{recipe.servings}</p>
                          </div>
                          <div>
                            <h3>Category: </h3>
                            <p>{recipe.category}</p>
                          </div>
                          <div>
                            <h3>Course: </h3>
                            <p>{recipe.course}</p>
                          </div>
                          <div>
                            <h3>Cuisine: </h3>
                            <p>{recipe.cuisine}</p>
                          </div>
                          <div>
                            <h3>Diet: </h3>
                            <p>{recipe.diet}</p>
                          </div>
                        </div>
                        <div
                          className="recipeInfoB"
                          id={`recipeInfo${recipe.recipeID}B`}
                        >
                          <h3>Description:</h3>
                          <p className="recipeInfoDesc">{recipe.description}</p>
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
                          {recipe.instructions.split(".").map((instruction) => (
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

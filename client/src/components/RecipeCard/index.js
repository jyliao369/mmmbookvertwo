import React from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";

const RecipeCard = ({ recipe }) => {
  // console.log(recipe);
  // console.log(recipe[1]);
  // console.log(recipe[2][recipe[1]].totalLikes);
  // console.log(recipe[3][recipe[1]].totalBookmarks);

  const moreInfo = (event, type, recipeInfo) => {
    event.preventDefault();

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

  const instrSplit = (instr) => {
    // console.log(test.split("."));
    return instr.split(".");
  };

  const ingrSplit = (ingre) => {
    // console.log(ingre.split("\n"));
    return ingre.split("\n");
  };

  return (
    <div className="recipeCard">
      <div className="recipeCardA" id={`recipeCard${recipe.recipeID}a`}>
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
                <div className="recipeInfoStatsCont" id="recipeInfoStatsCont">
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
            <div className="recipeInfoA" id={`recipeInfo${recipe.recipeID}A`}>
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
            <div className="recipeInfoB" id={`recipeInfo${recipe.recipeID}B`}>
              <h3>Description:</h3>
              <p className="recipeInfoDesc">{recipe.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="recipeCardB" id={`recipeCard${recipe.recipeID}b`}>
        <div className="recipeCardIngIns">
          <div className="recipeCardIng">
            <h3>Ingredients</h3>
            <div>
              {ingrSplit(recipe.ingredients).map((ingredient) => (
                <p key={ingredient}>{ingredient}</p>
              ))}
            </div>
          </div>
          <div className="recipeCardIns">
            <h3>Instructions</h3>
            <div>
              {instrSplit(recipe.instructions).map((instruction) => (
                <p key={instruction}>{instruction}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="recipeCardC">
        <div className="recipeInfoPoster">
          <Link to={`/profile/${recipe.userID}`}>
            <PersonOutlineOutlinedIcon />
          </Link>
          <p>{recipe.username} on "date"</p>
        </div>
        <div className="recipeInfoMore">
          <button
            style={{ cursor: "pointer" }}
            onClick={(event) =>
              moreInfo(event, "ingIns", `recipeCard${recipe.recipeID}`)
            }
          >
            <FeedOutlinedIcon />
          </button>
          <button
            style={{ cursor: "pointer" }}
            onClick={(event) =>
              moreInfo(event, "recipeDesc", `recipeInfo${recipe.recipeID}`)
            }
          >
            <InfoOutlinedIcon />
          </button>
          {recipe.type === "update" ? (
            <button>
              <Link to={`/update/${recipe.recipeID}`}>
                <EditRoundedIcon />
              </Link>
            </button>
          ) : (
            <>
              {recipe.type === "customize" ? (
                <>
                  <button>
                    <Link to={`/customize/${recipe.recipeID}`}>
                      <AutoFixHighRoundedIcon />
                    </Link>
                  </button>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

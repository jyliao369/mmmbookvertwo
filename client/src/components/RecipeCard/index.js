import React from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import Axios from "axios";

import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const RecipeCard = (recipe, currentUser) => {
  console.log(currentUser);

  const moreInfo = (event, type, recipeInfo) => {
    event.preventDefault();
    // console.log(type);
    // console.log(recipeInfo);

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
      <div className="recipeCardA" id={`recipeCard${recipe.recipe.recipeID}a`}>
        <div className="recipeCardMainInfo">
          <Link to={`/recipe/${recipe.recipe.recipeID}`}>
            <div className="recipeImage">
              <div className="recipeImageCont">
                {recipe.recipe.recipeImageID === "" ||
                recipe.recipe.recipeImageID === null ? (
                  <Image
                    cloudName="du119g90a"
                    public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                  ></Image>
                ) : (
                  <Image
                    cloudName="du119g90a"
                    public_id={recipe.recipe.recipeImageID}
                  ></Image>
                )}
              </div>
              <div className="recipeInfoCont">
                <div className="recipeInfoTitle">
                  <h3>{recipe.recipe.name}</h3>
                </div>
                <div className="recipeInfoStatsCont" id="recipeInfoStatsCont">
                  <div className="recipeInfoStats">
                    <div>
                      <FavoriteBorderOutlinedIcon />
                      <p>#</p>
                    </div>
                    <div>
                      <StarOutlineOutlinedIcon />
                      <p>#</p>
                    </div>
                    <div>
                      <ChatBubbleOutlineOutlinedIcon />
                      <p>#</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="recipeInfo">
            <div
              className="recipeInfoA"
              id={`recipeInfo${recipe.recipe.recipeID}A`}
            >
              <div>
                <h3>Prep Time: </h3>
                <p>{recipe.recipe.prepTime} min</p>
              </div>
              <div>
                <h3>Cook Time: </h3>
                <p>{recipe.recipe.cookTime} min</p>
              </div>
              <div>
                <h3>Total Time: </h3>
                <p>{recipe.recipe.totalTime} min</p>
              </div>
              <div>
                <h3>Yield: </h3>
                <p>{recipe.recipe.yield}</p>
              </div>
              <div>
                <h3>Servings: </h3>
                <p>{recipe.recipe.servings}</p>
              </div>
              <div>
                <h3>Category: </h3>
                <p>{recipe.recipe.category}</p>
              </div>
              <div>
                <h3>Course: </h3>
                <p>{recipe.recipe.course}</p>
              </div>
              <div>
                <h3>Cuisine: </h3>
                <p>{recipe.recipe.cuisine}</p>
              </div>
              <div>
                <h3>Diet: </h3>
                <p>{recipe.recipe.diet}</p>
              </div>
            </div>
            <div
              className="recipeInfoB"
              id={`recipeInfo${recipe.recipe.recipeID}B`}
            >
              <h3>Description:</h3>
              <p className="recipeInfoDesc">{recipe.recipe.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="recipeCardB" id={`recipeCard${recipe.recipe.recipeID}b`}>
        <div className="recipeCardIngIns">
          <div className="recipeCardIng">
            <h3>Ingredients</h3>
            <div>
              {ingrSplit(recipe.recipe.ingredients).map((ingredient) => (
                <p key={ingredient}>{ingredient}</p>
              ))}
            </div>
          </div>
          <div className="recipeCardIns">
            <h3>Instructions</h3>
            <div>
              {instrSplit(recipe.recipe.instructions).map((instruction) => (
                <p key={instruction}>{instruction}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="recipeCardC">
        <div className="recipeInfoPoster">
          <Link to={`/profile/${recipe.recipe.userID}`}>
            <PersonOutlineOutlinedIcon />
          </Link>
          <p>{recipe.recipe.username} on "date"</p>
        </div>
        <div className="recipeInfoMore">
          <button
            style={{ cursor: "pointer" }}
            onClick={(event) =>
              moreInfo(event, "ingIns", `recipeCard${recipe.recipe.recipeID}`)
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
                `recipeInfo${recipe.recipe.recipeID}`
              )
            }
          >
            <InfoOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

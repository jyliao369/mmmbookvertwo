import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";

const RecipePage = ({ isLoggedIn, currentUser }) => {
  let { recipeID } = useParams();

  console.log("user");
  console.log(currentUser);

  const [recipeInfo, setRecipeInfo] = useState([]);
  const [recipeDesc, setRecipeDesc] = useState("");
  const [recipeIng, setRecipeIng] = useState([]);
  const [recipeIns, setRecipeIns] = useState([]);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const instrSplit = (instr) => {
    setRecipeIns(instr.split("."));
  };

  const ingrSplit = (ingre) => {
    setRecipeIng(ingre.split("\n"));
  };

  const postReview = () => {
    console.log("review " + review);
    console.log("rating " + rating);
    console.log(currentUser.userID);
    console.log(currentUser.username);
  };

  const rate = (rate) => {
    for (let a = 1; a <= 5; a++) {
      document.getElementById(`star${a}`).childNodes[0].style.color =
        "lightgray";
    }
    // CHANGE BASED ON RATING
    for (let a = 1; a <= rate; a++) {
      document.getElementById(`star${a}`).childNodes[0].style.color = "red";
    }
  };

  const setRate = (rate) => {
    // RESETS TO GRAY
    for (let a = 1; a <= 5; a++) {
      document.getElementById(`star${a}`).childNodes[0].style.color =
        "lightgray";
    }
    // CHANGE BASED ON RATING
    for (let a = 1; a <= rate; a++) {
      document.getElementById(`star${a}`).childNodes[0].style.color = "red";
    }

    setRating(rate);
  };

  const reset = () => {
    for (let a = 1; a <= 5; a++) {
      document.getElementById(`star${a}`).childNodes[0].style.color =
        "lightgray";
    }
    for (let a = 1; a <= rating; a++) {
      document.getElementById(`star${a}`).childNodes[0].style.color = "red";
    }
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/getRecipe/${recipeID}`, {}).then(
      (response) => {
        // console.log(response.data[0].ingredients);
        setRecipeInfo(response.data[0]);
        setRecipeDesc(response.data[0].description);
        instrSplit(response.data[0].instructions);
        ingrSplit(response.data[0].ingredients);
      }
    );
  }, []);

  return (
    <div className="recipePage">
      <div className="recipePageCard">
        <div className="recipePageCardA">
          <div className="recipePageCardAa">
            <div className="recipePageCardImg" />
            <div className="recipePageCardInfo">
              <div className="recipePageCardInfoA">
                <h2>{recipeInfo.name}</h2>
                <p>Description: {recipeDesc}</p>
              </div>
              <div className="recipePageCardInfoB">
                <div className="recipePageCardInfoBa">
                  <p>Prep Time: {recipeInfo.prepTime} min</p>
                  <p>Cook Time: {recipeInfo.cookTime} min</p>
                  <p>Total Time: {recipeInfo.totalTime} min</p>
                  <p>Yield: {recipeInfo.yield}</p>
                  <p>Servings: {recipeInfo.servings}</p>
                </div>
                <div className="recipePageCardInfoBa">
                  <p>Category: {recipeInfo.category}</p>
                  <p>Course: {recipeInfo.course}</p>
                  <p>Cuisine: {recipeInfo.cuisine}</p>
                  <p>Diet: {recipeInfo.diet}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="recipeCardC">
            <button>
              <FavoriteBorderOutlinedIcon />
            </button>
            <button>
              <ChatBubbleOutlineOutlinedIcon />
            </button>
            <button>
              <StarOutlineOutlinedIcon />
            </button>
            <button>
              <LibraryAddOutlinedIcon />
            </button>
          </div>
        </div>
        <div className="recipePageCardB">
          <div className="recipePageCardInfoC">
            <div className="recipePageCardInfoCa">
              <div className="recipePageCardIng">
                <h3>Ingredients</h3>
                {recipeIng.map((ingredient) => (
                  <p key={ingredient.slice(5, 15)}>{ingredient}</p>
                ))}
              </div>
              <div className="recipePageCardIns">
                <h3>Instructions</h3>
                {recipeIns.map((instruction) => (
                  <p key={instruction.slice(5, 15)}>{instruction}</p>
                ))}
              </div>
            </div>
            <div className="recipePageCardInfoCb">
              <h3>Additional Notes:</h3>
              <p>{recipeInfo.addNotes}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="commentSection">
        {isLoggedIn === false ? (
          <></>
        ) : (
          <div className="commentForm">
            <textarea
              placeholder="Write your Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={6}
            />
            <div className="reviewBtnCont">
              <div className="ratingForm">
                <p>Your Rating:</p>
                <div id="star1">
                  <StarPurple500OutlinedIcon
                    onClick={() => setRate(1)}
                    onMouseOver={() => rate(1)}
                    onMouseLeave={() => reset()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div id="star2">
                  <StarPurple500OutlinedIcon
                    onClick={() => setRate(2)}
                    onMouseOver={() => rate(2)}
                    onMouseLeave={() => reset()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div id="star3">
                  <StarPurple500OutlinedIcon
                    onClick={() => setRate(3)}
                    onMouseOver={() => rate(3)}
                    onMouseLeave={() => reset()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div id="star4">
                  <StarPurple500OutlinedIcon
                    onClick={() => setRate(4)}
                    onMouseOver={() => rate(4)}
                    onMouseLeave={() => reset()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div id="star5">
                  <StarPurple500OutlinedIcon
                    onClick={() => setRate(5)}
                    onMouseOver={() => rate(5)}
                    onMouseLeave={() => reset()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <button onClick={() => postReview()}>Post Review</button>
            </div>
          </div>
        )}
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default RecipePage;

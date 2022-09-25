import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

const RecipePage = ({ isLoggedIn, currentUser }) => {
  let { recipeID } = useParams();

  const [recipeInfo, setRecipeInfo] = useState([]);
  const [recipeDesc, setRecipeDesc] = useState("");
  const [recipeIng, setRecipeIng] = useState([]);
  const [recipeIns, setRecipeIns] = useState([]);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const [reviews, setReviews] = useState([]);

  const instrSplit = (instr) => {
    setRecipeIns(instr.split("."));
  };

  const ingrSplit = (ingre) => {
    setRecipeIng(ingre.split("\n"));
  };

  const postReview = () => {
    Axios.post(`http://localhost:3001/postReview`, {
      recipeID: recipeID,
      userID: currentUser.userID,
      username: currentUser.username,
      review: review,
      rating: rating,
    }).then((response) => {
      console.log(response);

      setReview("");
      for (let a = 1; a <= 5; a++) {
        document.getElementById(`star${a}`).childNodes[0].style.color =
          "lightgray";
      }

      Axios.get(`http://localhost:3001/getReview/${recipeID}`, {}).then(
        (response) => {
          setReviews(response.data.reverse());
        }
      );
    });
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

  const bookmarkRecipe = (event, recipeID) => {
    // console.log("bookmarking this recipe");
    // console.log(recipeID);

    Axios.post(`http://localhost:3001/createBookmark`, {
      userID: currentUser.userID,
      username: currentUser.username,
      recipeID: recipeID,
    }).then((response) => {
      console.log(response);
    });
  };

  const addLike = (event, recipeID) => {
    // console.log("i like this recipe");
    // console.log(recipeID);

    Axios.post(`http://localhost:3001/createLikes`, {
      userID: currentUser.userID,
      username: currentUser.username,
      recipeID: recipeID,
    }).then((response) => {
      console.log(response);
      Axios.get(`http://localhost:3001/getAllRecipes`, {}).then((response) => {
        // console.log(response.data);
        // setAllRecipes(response.data);
      });
    });
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

    Axios.get(`http://localhost:3001/getReview/${recipeID}`, {}).then(
      (response) => {
        // console.log(response.data);
        setReviews(response.data.reverse());
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
                <h3>{recipeInfo.name}</h3>
                <div className="recipeInfoPoster">
                  <p>Posted by: {recipeInfo.username}</p>
                </div>
                <div className="recipeInfoDesc">
                  <p>Description: {recipeDesc}</p>
                </div>
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
            <button style={{ cursor: "pointer" }} className="chefProfileBtn">
              <Link to={`/profile/${recipeInfo.userID}`}>
                <AccountBoxOutlinedIcon />
              </Link>
            </button>

            {isLoggedIn === true ? (
              <>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(event) =>
                    bookmarkRecipe(event, recipeInfo.recipeID)
                  }
                  className="bookmarkBtn"
                >
                  <FavoriteBorderOutlinedIcon />
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(event) => addLike(event, recipeInfo.recipeID)}
                  className="likeBtn"
                >
                  <StarOutlineOutlinedIcon />
                </button>
              </>
            ) : (
              <>
                <button className="bookmarkBtn">
                  <FavoriteBorderOutlinedIcon />
                </button>
                <button className="likeBtn">
                  <StarOutlineOutlinedIcon />
                </button>
              </>
            )}

            <button className="reviewBtn">
              <ChatBubbleOutlineOutlinedIcon />
            </button>
          </div>
        </div>
        <div className="recipePageCardB">
          <div className="recipePageCardInfoBb">
            <div className="recipePageCardIng">
              <h3>Ingredients</h3>
              <div className="recipePageCardIngA">
                {recipeIng.map((ingredient) => (
                  <p key={ingredient.slice(5, 15)}>{ingredient}</p>
                ))}
              </div>
            </div>
            <div className="recipePageCardIns">
              <h3>Instructions</h3>
              <div className="recipePageCardInsA">
                {recipeIns.map((instruction) => (
                  <p key={instruction.slice(5, 15)}>{instruction}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="recipePageCardInfoCb">
            <h3>Additional Notes:</h3>
            <div>
              <p>{recipeInfo.addNotes}</p>
            </div>
          </div>
        </div>
      </div>

      {isLoggedIn === false ? (
        <></>
      ) : (
        <div className="reviewFormCont">
          <div className="profileIcon">
            <div className="profileImg" />
            <p>{currentUser.username}</p>
          </div>
          <div className="reviewForm">
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
              {rating === 0 || review === "" ? (
                <button disabled={true}>Post Review</button>
              ) : (
                <button onClick={() => postReview()}>Post Review</button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="reviewsSections">
        <div className="reviewsSectionCont">
          {reviews.map((review) => (
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
        </div>
      </div>
    </div>
  );
};

export default RecipePage;

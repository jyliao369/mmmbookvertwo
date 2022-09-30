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

import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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
    Axios.post(`https://mmmbook-vertwo-server.herokuapp.com/postReview`, {
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

      Axios.get(
        `https://mmmbook-vertwo-server.herokuapp.com/getReview/${recipeID}`,
        {}
      ).then((response) => {
        setReviews(response.data.reverse());
      });
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

    Axios.post(`https://mmmbook-vertwo-server.herokuapp.com/createBookmark`, {
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

    Axios.post(`https://mmmbook-vertwo-server.herokuapp.com/createLikes`, {
      userID: currentUser.userID,
      username: currentUser.username,
      recipeID: recipeID,
    }).then((response) => {
      console.log(response);
      Axios.get(
        `https://mmmbook-vertwo-server.herokuapp.com/getAllRecipes`,
        {}
      ).then((response) => {
        // console.log(response.data);
        // setAllRecipes(response.data);
      });
    });
  };

  useEffect(() => {
    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getRecipe/${recipeID}`,
      {}
    ).then((response) => {
      // console.log(response.data[0].ingredients);
      setRecipeInfo(response.data[0]);
      setRecipeDesc(response.data[0].description);
      instrSplit(response.data[0].instructions);
      ingrSplit(response.data[0].ingredients);
    });

    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getReview/${recipeID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setReviews(response.data.reverse());
    });
  }, []);

  return (
    <div className="recipePage">
      <div className="recipePageCard">
        <div className="recipePageCardA">
          <div className="recipePageCardAa">
            <div className="recipePageCardInfo">
              <div className="recipePageCardInfoA">
                <h1>{recipeInfo.name}</h1>
                <div className="recipePageCardPoster">
                  <p>Posted by: {recipeInfo.username}</p>
                </div>
                <div className="recipePageCardDesc">
                  <p>Description: {recipeDesc}</p>
                </div>
                <div className="recipeInfoBasic">
                  <div className="recipePageCardBasic">
                    <HourglassEmptyIcon />
                    <p>Prep Time: {recipeInfo.prepTime} min</p>
                  </div>
                  <div className="recipePageCardBasic">
                    <AccessAlarmsIcon />
                    <p>Cook Time: {recipeInfo.cookTime} min</p>
                  </div>
                  <div className="recipePageCardBasic">
                    <AccessTimeIcon />
                    <p>Total Time: {recipeInfo.totalTime} min</p>
                  </div>
                </div>
                <div className="recipeInfoBasic">
                  <div className="recipePageCardBasic">
                    <LocalDiningIcon />
                    <p>Yield: {recipeInfo.yield}</p>
                  </div>
                  <div className="recipePageCardBasic">
                    <RoomServiceIcon />
                    <p>Servings: {recipeInfo.servings}</p>
                  </div>
                  <div className="recipePageCardBasic">
                    <MenuBookIcon />
                    <p>Diet: {recipeInfo.diet}</p>
                  </div>
                </div>
                <div className="recipeInfoBasic">
                  <div className="recipePageCardBasic">
                    <BrunchDiningIcon />
                    <p>Category: {recipeInfo.category}</p>
                  </div>
                  <div className="recipePageCardBasic">
                    <DinnerDiningIcon />
                    <p>Course: {recipeInfo.course}</p>
                  </div>
                  <div className="recipePageCardBasic">
                    <RamenDiningIcon />
                    <p>Cuisine: {recipeInfo.cuisine}</p>
                  </div>
                </div>
              </div>
              <div className="recipeCardButton">
                <button
                  style={{ cursor: "pointer" }}
                  className="chefProfileBtn"
                >
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
            <div className="recipePageCardImg" />
          </div>
        </div>
        <div className="recipePageCardB">
          <div className="recipePageCardInfoBb">
            <div className="recipePageCardIng">
              <h1>Ingredients</h1>
              <div className="recipePageCardIngA">
                {recipeIng.map((ingredient) => (
                  <p key={ingredient.slice(5, 15)}>{ingredient}</p>
                ))}
              </div>
            </div>
            <div className="verticalDivide" />
            <div className="recipePageCardIns">
              <h1>Instructions</h1>
              <ol className="recipePageCardInsA">
                {recipeIns.map((instruction) => (
                  <li key={instruction.slice(5, 15)}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className="recipePageCardInfoCb">
            <h2>Additional Notes:</h2>
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

      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default RecipePage;

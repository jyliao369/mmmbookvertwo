import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Image } from "cloudinary-react";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
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
  const [recipeTotalLikes, setRecipeTotalLikes] = useState("");
  const [recipeTotalBookmark, setRecipeTotalBookmark] = useState("");
  const [recipeTotalReviews, setRecipeTotalReviews] = useState("");

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
          <StarRoundedIcon />
        </>
      );
    } else if (rating === 2) {
      return (
        <>
          <StarRoundedIcon />
          <StarRoundedIcon />
        </>
      );
    } else if (rating === 3) {
      return (
        <>
          <StarRoundedIcon />
          <StarRoundedIcon />
          <StarRoundedIcon />
        </>
      );
    } else if (rating === 4) {
      return (
        <>
          <StarRoundedIcon />
          <StarRoundedIcon />
          <StarRoundedIcon />
          <StarRoundedIcon />
        </>
      );
    } else if (rating === 5) {
      return (
        <>
          <StarRoundedIcon />
          <StarRoundedIcon />
          <StarRoundedIcon />
          <StarRoundedIcon />
          <StarRoundedIcon />
        </>
      );
    }
  };

  const bookmarkRecipe = (event, recipeID) => {
    event.preventDefault();

    Axios.post(`http://localhost:3001/createBookmark`, {
      userID: currentUser.userID,
      username: currentUser.username,
      recipeID: recipeID,
    }).then((response) => {
      if (response.data.message === "bookmarked") {
        setRecipeTotalBookmark(recipeTotalBookmark + 1);
        document.getElementById("bookmarkBtn").children[0].style.color =
          "#E1528E";
      } else if (response.data.message === "unbookmarked") {
        setRecipeTotalBookmark(recipeTotalBookmark - 1);
        document.getElementById("bookmarkBtn").children[0].style.color =
          "lightgray";
      }
    });
  };

  const addLike = (event, recipeID) => {
    event.preventDefault();

    Axios.post(`http://localhost:3001/createLikes`, {
      userID: currentUser.userID,
      username: currentUser.username,
      recipeID: recipeID,
    }).then((response) => {
      if (response.data.message === "liked") {
        setRecipeTotalLikes(recipeTotalLikes + 1);
        document.getElementById("likeBtn").children[0].style.color = "gold";
      } else if (response.data.message === "unliked") {
        setRecipeTotalLikes(recipeTotalLikes - 1);
        document.getElementById("likeBtn").children[0].style.color =
          "lightgray";
      }
    });
  };

  const scrollToReview = () => {
    document.getElementById("reviewsSections").scrollIntoView();
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/getRecipe/${recipeID}`, {}).then(
      (response) => {
        // console.log(response.data[0]);
        setRecipeInfo(response.data[0]);
        setRecipeDesc(response.data[0].description);
        instrSplit(response.data[0].instructions);
        ingrSplit(response.data[0].ingredients);
        setRecipeTotalLikes(response.data[0].totalLike);
        setRecipeTotalBookmark(response.data[0].totalBook);
        setRecipeTotalReviews(response.data[0].totalReview);
      }
    );

    Axios.get(
      `https://mmmbook-vertwo-server.herokuapp.com/getReview/${recipeID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setReviews(response.data.reverse());
    });

    Axios.get(`http://localhost:3001/getAllLikes/${recipeID}`, {}).then(
      (response) => {
        // console.log(response.data);
        let allLikes = response.data;
        Axios.get(`https://mmmbook-vertwo-server.herokuapp.com/login`, {}).then(
          (response) => {
            if (response.data.loggedIn === true) {
              for (let a = 0; a < allLikes.length; a++) {
                if (
                  response.data.user[0].username === allLikes[a].username &&
                  response.data.user[0].userID === allLikes[a].userID
                ) {
                  // console.log(true);
                  document.getElementById("likeBtn").children[0].style.color =
                    "gold";
                }
              }
            }
          }
        );
      }
    );

    Axios.get(`http://localhost:3001/getAllBookmarked/${recipeID}`, {}).then(
      (response) => {
        // console.log(response.data);
        let allBookmarks = response.data;
        Axios.get(`https://mmmbook-vertwo-server.herokuapp.com/login`, {}).then(
          (response) => {
            if (response.data.loggedIn === true) {
              for (let a = 0; a < allBookmarks.length; a++) {
                if (
                  response.data.user[0].username === allBookmarks[a].username &&
                  response.data.user[0].userID === allBookmarks[a].userID
                ) {
                  // console.log(true);
                  document.getElementById(
                    "bookmarkBtn"
                  ).children[0].style.color = "#E1528E";
                }
              }
            }
          }
        );
      }
    );
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
                      id="bookmarkBtn"
                    >
                      <FavoriteOutlinedIcon />
                      <p>{recipeTotalBookmark}</p>
                    </button>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={(event) => addLike(event, recipeInfo.recipeID)}
                      className="likeBtn"
                      id="likeBtn"
                    >
                      <StarRoundedIcon />
                      <p>{recipeTotalLikes}</p>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bookmarkBtn">
                      <FavoriteOutlinedIcon />
                      <p>{recipeTotalBookmark}</p>
                    </button>
                    <button className="likeBtn">
                      <StarRoundedIcon />
                      <p>{recipeTotalLikes}</p>
                    </button>
                  </>
                )}

                <button
                  className="reviewBtn"
                  onClick={() => scrollToReview()}
                  style={{ cursor: "pointer" }}
                >
                  <ForumRoundedIcon />
                  <p>{recipeTotalReviews}</p>
                </button>
              </div>
            </div>
            <div className="recipePageCardImg">
              {recipeInfo.recipeImageID === "" ||
              recipeInfo.recipeImageID === null ? (
                <Image
                  width="100%"
                  height="100%"
                  cloudName="du119g90a"
                  public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                ></Image>
              ) : (
                <Image
                  width="100%"
                  cloudName="du119g90a"
                  public_id={recipeInfo.recipeImageID}
                ></Image>
              )}
            </div>
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
                  <StarRoundedIcon
                    onClick={() => setRate(1)}
                    onMouseOver={() => rate(1)}
                    onMouseLeave={() => reset()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div id="star2">
                  <StarRoundedIcon
                    onClick={() => setRate(2)}
                    onMouseOver={() => rate(2)}
                    onMouseLeave={() => reset()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div id="star3">
                  <StarRoundedIcon
                    onClick={() => setRate(3)}
                    onMouseOver={() => rate(3)}
                    onMouseLeave={() => reset()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div id="star4">
                  <StarRoundedIcon
                    onClick={() => setRate(4)}
                    onMouseOver={() => rate(4)}
                    onMouseLeave={() => reset()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div id="star5">
                  <StarRoundedIcon
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

      <div className="reviewsSections" id="reviewsSections">
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

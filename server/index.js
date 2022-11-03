const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

// NUM OF SALTROUNDS
const saltRounds = 10;

// BODYPARSER, PASS DATA FROM FRONT TO BACK
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS SETUP
app.use(
  cors({
    // origin: ["http://localhost:3000"],
    origin: ["https://jyliao369.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// SETTING UP COOKIES AND SESSIONS FOR LOGIN
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userID",
    secret: "testingoutsessionishard",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      secure: false,
      httpOnly: true,
      expires: 60 * 60 * 1000 * 24,
    },
  })
);

// MYSQL CONNECTION
const db = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b4bb8c0f041384",
  password: "f9833de4",
  database: "heroku_289aeecd4cbfb0f",
});

// #ALLROUTES
// #ACCOUNT
// #REGISTER
app.post("/register", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.users_table WHERE email = ?`,
    [email],
    (err, result) => {
      if (result.length > 0) {
        res.send({ message: "This email has been taken" });
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          }
          db.query(
            `INSERT INTO heroku_289aeecd4cbfb0f.users_table
              (firstName, lastName, username, email, password)
              VALUES (?,?,?,?,?)`,
            [firstName, lastName, username, email, hash],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                req.session.user = result;
                res.send(result);
              }
            }
          );
        });
      }
    }
  );
});

// #LOGIN
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({
      isLoggedIn: true,
      message: "you are logged in",
      user: req.session.user,
    });
  } else {
    res.send({ isLoggedIn: false, message: "you are not logged in" });
  }
});

app.post("/login", (req, res) => {
  const loginEmail = req.body.loginEmail;
  const loginPass = req.body.loginPass;
  // console.log(loginEmail);

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.users_table WHERE email = ?`,
    [loginEmail],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        bcrypt.compare(loginPass, result[0].password, (err, response) => {
          if (response === true) {
            req.session.user = result;
            // console.log(req.session.user);
            res.send({ isLoggedIn: true, result });
          } else if (response === false) {
            res.send({ message: "Incorrect password!! Try again" });
          }
        });
      } else {
        res.send({ message: "No User Found" });
      }
    }
  );
});

// #LOGOUT
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Logged Out");
    }
  });
});

// #USERS
// #GETALLUSERS
app.get("/getAllUsers", (req, res) => {
  db.query(
    "SELECT * FROM heroku_289aeecd4cbfb0f.users_table",
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// #GETUSERSBYID
app.get("/getUser/:userID", (req, res) => {
  const userID = req.params.userID;

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.users_table WHERE userID = ?`,
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #UPDATEUSER
app.put(`/updateUser/:userID`, (req, res) => {
  const userID = req.params.userID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const favRecipe = req.body.favRecipe;
  const favBeverage = req.body.favBeverage;
  const favDessert = req.body.favDessert;
  const favCuisine = req.body.favCuisine;
  const chefDesc = req.body.chefDesc;

  db.query(
    `UPDATE heroku_289aeecd4cbfb0f.users_table 
    SET 
      firstName = "${firstName}", 
      lastName = "${lastName}", 
      username = "${username}", 
      email = "${email}", 
      favRecipe = "${favRecipe}", 
      favBeverage = "${favBeverage}", 
      favDessert = "${favDessert}", 
      favCuisine = "${favCuisine}", 
      chefDesc = "${chefDesc}" 
    WHERE userID = ${userID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #RECIPES
// #CREATERECIPES
app.post("/createRecipe", (req, res) => {
  const userID = req.body.userID;
  const username = req.body.username;
  const recipeImageID = req.body.recipeImageID;
  const recipeName = req.body.recipeName;
  const recipeDesc = req.body.recipeDesc;
  const prepTime = req.body.prepTime;
  const cookTime = req.body.cookTime;
  const totalTime = parseInt(prepTime) + parseInt(cookTime);
  const yieldNum = req.body.yieldNum;
  const servingsNum = req.body.servingsNum;
  const category = req.body.category;
  const course = req.body.course;
  const cuisine = req.body.cuisine;
  const diet = req.body.diet;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;
  const addNotes = req.body.addNotes;

  db.query(
    `INSERT INTO heroku_289aeecd4cbfb0f.recipes_table
    (userID, username,recipeImageID, name, description, 
    prepTime, cookTime, totalTime, category, yield, 
    servings, course, cuisine, diet, ingredients, 
    instructions, addNotes)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      userID,
      username,
      recipeImageID,
      recipeName,
      recipeDesc,
      prepTime,
      cookTime,
      totalTime,
      category,
      yieldNum,
      servingsNum,
      course,
      cuisine,
      diet,
      ingredients,
      instructions,
      addNotes,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

// #CUSTOMIZERECIPES
app.post("/customizeRecipe", (req, res) => {
  const userID = req.body.userID;
  const username = req.body.username;
  const origRecipeID = req.body.origRecipeID;
  const origRecipeName = req.body.origRecipeName;
  const recipeImageID = req.body.recipeImageID;
  const recipeName = req.body.recipeName;
  const recipeDesc = req.body.recipeDesc;
  const prepTime = req.body.prepTime;
  const cookTime = req.body.cookTime;
  const totalTime = parseInt(prepTime) + parseInt(cookTime);
  const yieldNum = req.body.yieldNum;
  const servingsNum = req.body.servingsNum;
  const category = req.body.category;
  const course = req.body.course;
  const cuisine = req.body.cuisine;
  const diet = req.body.diet;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;
  const addNotes = req.body.addNotes;

  db.query(
    `INSERT INTO heroku_289aeecd4cbfb0f.recipes_table
    (origRecipeID, origRecipeName, userID, username,
    recipeImageID, name, description, prepTime, cookTime,
    totalTime, category, yield, servings, course, cuisine,
    diet, ingredients, instructions, addNotes)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      origRecipeID,
      origRecipeName,
      userID,
      username,
      recipeImageID,
      recipeName,
      recipeDesc,
      prepTime,
      cookTime,
      totalTime,
      category,
      yieldNum,
      servingsNum,
      course,
      cuisine,
      diet,
      ingredients,
      instructions,
      addNotes,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #GETRECIPEBYID
app.get(`/recipe/:recipeID`, (req, res) => {
  const recipeID = req.params.recipeID;

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.recipes_table WHERE recipeID = ${recipeID}`,
    [recipeID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #UPDATERECIPEBYID
app.put("/updateRecipe/:recipeID", (req, res) => {
  const recipeID = req.params.recipeID;
  const updateImage = req.body.updateImage;
  const updateName = req.body.updateName;
  const updateDesc = req.body.updateDesc;
  const updateCategory = req.body.updateCategory;
  const updateCourse = req.body.updateCourse;
  const updateCuisine = req.body.updateCuisine;
  const updateDiet = req.body.updateDiet;
  const updatePrep = req.body.updatePrep;
  const updateCook = req.body.updateCook;
  const updateYield = req.body.updateYield;
  const updateServings = req.body.updateServings;
  const updateIng = req.body.updateIng;
  const updateIns = req.body.updateIns;
  const updateAdd = req.body.updateAdd;

  db.query(
    `UPDATE heroku_289aeecd4cbfb0f.recipes_table
    SET 
      heroku_289aeecd4cbfb0f.recipes_table.recipeImageID = "${updateImage}",
      heroku_289aeecd4cbfb0f.recipes_table.name = "${updateName}",
      heroku_289aeecd4cbfb0f.recipes_table.description = "${updateDesc}",
      heroku_289aeecd4cbfb0f.recipes_table.prepTime = "${updatePrep}",
      heroku_289aeecd4cbfb0f.recipes_table.cookTime = "${updateCook}",
      heroku_289aeecd4cbfb0f.recipes_table.totalTime= "${
        parseInt(updatePrep) + parseInt(updateCook)
      }",
      heroku_289aeecd4cbfb0f.recipes_table.category = "${updateCategory}",
      heroku_289aeecd4cbfb0f.recipes_table.yield = "${updateYield}",
      heroku_289aeecd4cbfb0f.recipes_table.servings = "${updateServings}",
      heroku_289aeecd4cbfb0f.recipes_table.course = "${updateCourse}",
      heroku_289aeecd4cbfb0f.recipes_table.cuisine = "${updateCuisine}",
      heroku_289aeecd4cbfb0f.recipes_table.diet = "${updateDiet}",
      heroku_289aeecd4cbfb0f.recipes_table.ingredients = "${updateIng}",
      heroku_289aeecd4cbfb0f.recipes_table.instructions = "${updateIns}",
      heroku_289aeecd4cbfb0f.recipes_table.addNotes = "${updateAdd}"
    WHERE heroku_289aeecd4cbfb0f.recipes_table.recipeID = ${recipeID}`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #DELETERECIPEID
app.delete(`/deleteRecipes/:recipeID`, (req, res) => {
  const recipeID = req.params.recipeID;
  // console.log(recipeID);

  db.query(
    `DELETE FROM heroku_289aeecd4cbfb0f.recipes_table WHERE recipeID = ${recipeID}`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #GETALLRECIPES
app.get("/getAllRecipes", (req, res) => {
  db.query(
    `SELECT
     heroku_289aeecd4cbfb0f.recipes_table.*,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.likes_table.likeID) AS totalLikes,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.reviews_table.reviewID) AS totalReviews,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.bookmark_table.bookmarkID) AS totalBookmarks,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.views_table.viewID) AS totalViews
    FROM 
      heroku_289aeecd4cbfb0f.recipes_table
    LEFT JOIN heroku_289aeecd4cbfb0f.likes_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.likes_table.recipeID
    LEFT JOIN heroku_289aeecd4cbfb0f.reviews_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.reviews_table.recipeID
    LEFT JOIN heroku_289aeecd4cbfb0f.bookmark_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.bookmark_table.recipeID
    LEFT JOIN heroku_289aeecd4cbfb0f.views_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.views_table.recipeID
    GROUP BY heroku_289aeecd4cbfb0f.recipes_table.recipeID`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #GETONLYDRINKSANDBEVERAGES
app.get("/drinksOnly", (req, res) => {
  db.query(
    `SELECT
     heroku_289aeecd4cbfb0f.recipes_table.*,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.likes_table.likeID) AS totalLikes,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.reviews_table.reviewID) AS totalReviews,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.bookmark_table.bookmarkID) AS totalBookmarks,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.views_table.viewID) AS totalViews
    FROM 
      heroku_289aeecd4cbfb0f.recipes_table
    LEFT JOIN heroku_289aeecd4cbfb0f.likes_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.likes_table.recipeID
    LEFT JOIN heroku_289aeecd4cbfb0f.reviews_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.reviews_table.recipeID
    LEFT JOIN heroku_289aeecd4cbfb0f.bookmark_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.bookmark_table.recipeID
    LEFT JOIN heroku_289aeecd4cbfb0f.views_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.views_table.recipeID
    WHERE category = "Drinks" OR category = "Beverage"
    GROUP BY heroku_289aeecd4cbfb0f.recipes_table.recipeID`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #GETALLRECIPENOTDRINKSORBEVERAGE
app.get("/dishesOnly", (req, res) => {
  db.query(
    `SELECT
     heroku_289aeecd4cbfb0f.recipes_table.*,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.likes_table.likeID) AS totalLikes,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.reviews_table.reviewID) AS totalReviews,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.bookmark_table.bookmarkID) AS totalBookmarks,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.views_table.viewID) AS totalViews
     FROM 
      heroku_289aeecd4cbfb0f.recipes_table
     LEFT JOIN heroku_289aeecd4cbfb0f.likes_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.likes_table.recipeID
     LEFT JOIN heroku_289aeecd4cbfb0f.reviews_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.reviews_table.recipeID
     LEFT JOIN heroku_289aeecd4cbfb0f.bookmark_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.bookmark_table.recipeID
     LEFT JOIN heroku_289aeecd4cbfb0f.views_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.views_table.recipeID
     WHERE category != "Drinks" AND category != "Beverage"
     GROUP BY heroku_289aeecd4cbfb0f.recipes_table.recipeID`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #GETALLRECIPESBYUSERID
app.get("/getAllRecipesID/:userID", (req, res) => {
  const userID = req.params.userID;

  db.query(
    `SELECT
     heroku_289aeecd4cbfb0f.recipes_table.*,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.likes_table.likeID) AS totalLikes,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.reviews_table.reviewID) AS totalReviews,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.bookmark_table.bookmarkID) AS totalBookmarks,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.views_table.viewID) AS totalViews
     FROM 
      heroku_289aeecd4cbfb0f.recipes_table
     LEFT JOIN heroku_289aeecd4cbfb0f.likes_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.likes_table.recipeID
     LEFT JOIN heroku_289aeecd4cbfb0f.reviews_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.reviews_table.recipeID
     LEFT JOIN heroku_289aeecd4cbfb0f.bookmark_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.bookmark_table.recipeID
     LEFT JOIN heroku_289aeecd4cbfb0f.views_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.views_table.recipeID
     WHERE heroku_289aeecd4cbfb0f.recipes_table.userID = ${userID}
     GROUP BY heroku_289aeecd4cbfb0f.recipes_table.recipeID`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// GETRECIPEBYID
app.get("/getRecipe/:recipeID", (req, res) => {
  const recipeID = req.params.recipeID;

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.recipes_table,
      (SELECT COUNT(heroku_289aeecd4cbfb0f.likes_table.recipeID) as totalLike
        FROM heroku_289aeecd4cbfb0f.likes_table
        WHERE heroku_289aeecd4cbfb0f.likes_table.recipeID = ${recipeID}
      ) stat1,
      (SELECT COUNT(heroku_289aeecd4cbfb0f.bookmark_table.recipeID) as totalBook
        FROM heroku_289aeecd4cbfb0f.bookmark_table
        WHERE heroku_289aeecd4cbfb0f.bookmark_table.recipeID = ${recipeID}
      ) stat2,
        (SELECT COUNT(heroku_289aeecd4cbfb0f.reviews_table.recipeID) as totalReview
        FROM heroku_289aeecd4cbfb0f.reviews_table
        WHERE heroku_289aeecd4cbfb0f.reviews_table.recipeID = ${recipeID}
      ) stat3
    WHERE heroku_289aeecd4cbfb0f.recipes_table.recipeID = ${recipeID}`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #GETRECIPEBYNAME
app.get("/getRecipeName/:recipeName", (req, res) => {
  const recipeName = req.params.recipeName;
  // console.log(recipeName);

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.recipes_table WHERE name = ?`,
    [recipeName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #REVIEWS
// #POSTINGREVIEW
app.post("/postReview", (req, res) => {
  const recipeID = req.body.recipeID;
  const userID = req.body.userID;
  const username = req.body.username;
  const review = req.body.review;
  const rating = req.body.rating;

  db.query(
    `INSERT INTO heroku_289aeecd4cbfb0f.reviews_table 
    (recipeID, userID, username, review, rating)
    VALUES (?,?,?,?,?)`,
    [recipeID, userID, username, review, rating],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #GETALLREVIEWSBASEDONUSERID
app.get(`/getAllReviewsID/:userID`, (req, res) => {
  const userID = req.params.userID;

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.reviews_table WHERE userID =?`,
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #REVIEWBASEDONID
app.get(`/getReview/:recipeID`, (req, res) => {
  const recipeID = req.params.recipeID;

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.reviews_table WHERE recipeID = ?`,
    [recipeID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #FOLLOWER
// #FOLLOWINGANDUNFOLLOWING
app.post("/followingUser/:chefUserID", (req, res) => {
  const chefUserID = req.params.chefUserID;
  const userID = req.body.userID;
  const username = req.body.username;
  const chefUsername = req.body.chefUsername;

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.followchef_table WHERE chefUserID = ? AND userID = ? `,
    [chefUserID, userID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.length);
      }

      if (result.length <= 0) {
        db.query(
          `INSERT INTO heroku_289aeecd4cbfb0f.followchef_table
          (userID, username, chefUserID, chefUsername)
          VALUES (?,?,?,?)`,
          [userID, username, chefUserID, chefUsername],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
      } else if (result.length > 0) {
        db.query(
          `DELETE FROM heroku_289aeecd4cbfb0f.followchef_table WHERE chefUserID = ? AND userID = ?`,
          [chefUserID, userID],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});

// #CHECKFORFOLLOWERS/FOLLOWING
app.get("/test/:userID", (req, res) => {
  const info = req.params.userID;
  // console.log(info.split(","));

  const userID = info.split(",")[0];
  const chefUserID = info.split(",")[1];

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.followchef_table 
    WHERE chefUserID = "${chefUserID}" AND userID = "${userID}"`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send({ following: true });
      } else {
        res.send({ following: false });
      }
    }
  );
});

// #FINDALLUSERISFOLLOWING
app.get("/allFollowing/:userID", (req, res) => {
  const userID = req.params.userID;

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.followchef_table WHERE userID = ?`,
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #FINDFOLLOWERSOFUSER
app.get("/allFollowers/:userID", (req, res) => {
  const userID = req.params.userID;
  // console.log(userID);
  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.followchef_table WHERE chefUserID = ?`,
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #BOOKMARK
// #BOOKMARK/UNBOOKMARK
app.post(`/createBookmark`, (req, res) => {
  const userID = req.body.userID;
  const username = req.body.username;
  const recipeID = req.body.recipeID;

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.bookmark_table
    WHERE userID = ${userID} AND recipeID = ${recipeID}`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result.length);
      }

      if (result.length <= 0) {
        db.query(
          `INSERT INTO heroku_289aeecd4cbfb0f.bookmark_table
          (userID, username, recipeID) VALUES (?,?,?)`,
          [userID, username, recipeID],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send({ message: "bookmarked", result });
            }
          }
        );
      } else {
        db.query(
          `DELETE FROM heroku_289aeecd4cbfb0f.bookmark_table
          WHERE userID = ${userID} AND recipeID = ${recipeID}`,
          [],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send({ message: "unbookmarked", result });
            }
          }
        );
      }
    }
  );
});

// #DELETINGSPECIFICBOOKMARKBASEDONUSERNAMEUSERIDRECIPENAME
app.delete(`/deleteBookmark/:bookmarkInfo`, (req, res) => {
  const bookmarkInfo = req.params.bookmarkInfo.split("_");
  const recipeID = bookmarkInfo[0];
  const userID = bookmarkInfo[1];
  const username = bookmarkInfo[2];

  db.query(
    `SELECT 
      * 
    FROM 
      heroku_289aeecd4cbfb0f.bookmark_table
    WHERE 
      heroku_289aeecd4cbfb0f.bookmark_table.recipeID = ${recipeID} AND
      heroku_289aeecd4cbfb0f.bookmark_table.userID = ${userID} AND
      heroku_289aeecd4cbfb0f.bookmark_table.username = "${username}"`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result[0].bookmarkID);
        // res.send(result);

        db.query(
          `DELETE FROM heroku_289aeecd4cbfb0f.bookmark_table
          WHERE heroku_289aeecd4cbfb0f.bookmark_table.bookmarkID = ${result[0].bookmarkID}`,
          [],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
              res.send(result);
            }
          }
        );
      }
    }
  );
});

// #GETBOOKMARKEDRECIPESFORUSERS
app.get(`/getBookmarked/:userID`, (req, res) => {
  const userID = req.params.userID;
  // console.log(userID);

  db.query(
    `SELECT
      heroku_289aeecd4cbfb0f.bookmark_table.*,
      heroku_289aeecd4cbfb0f.recipes_table.*,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.likes_table.likeID) AS totalLikes,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.reviews_table.reviewID) AS totalReviews,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.bookmark_table.bookmarkID) AS totalBookmarks,
      COUNT(DISTINCT heroku_289aeecd4cbfb0f.views_table.viewID) AS totalViews
    FROM 
	    heroku_289aeecd4cbfb0f.bookmark_table
    LEFT JOIN heroku_289aeecd4cbfb0f.likes_table ON heroku_289aeecd4cbfb0f.bookmark_table.recipeID = heroku_289aeecd4cbfb0f.likes_table.recipeID
    LEFT JOIN heroku_289aeecd4cbfb0f.reviews_table ON heroku_289aeecd4cbfb0f.bookmark_table.recipeID = heroku_289aeecd4cbfb0f.reviews_table.recipeID
    LEFT JOIN heroku_289aeecd4cbfb0f.recipes_table ON heroku_289aeecd4cbfb0f.bookmark_table.recipeID = heroku_289aeecd4cbfb0f.recipes_table.recipeID
    LEFT JOIN heroku_289aeecd4cbfb0f.views_table ON heroku_289aeecd4cbfb0f.recipes_table.recipeID = heroku_289aeecd4cbfb0f.views_table.recipeID
    WHERE heroku_289aeecd4cbfb0f.bookmark_table.userID = ${userID}
    GROUP BY heroku_289aeecd4cbfb0f.bookmark_table.bookmarkID`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #GETALLUSERSWHOBOOKEDMARKEDARECIPE
app.get("/getAllBookmarked/:recipeID", (req, res) => {
  const recipeID = req.params.recipeID;
  // console.log(recipeID);

  db.query(
    `SELECT 
      heroku_289aeecd4cbfb0f.recipes_table.*, 
      heroku_289aeecd4cbfb0f.bookmark_table.bookmarkID, 
      heroku_289aeecd4cbfb0f.bookmark_table.userID, 
      heroku_289aeecd4cbfb0f.bookmark_table.username
    FROM heroku_289aeecd4cbfb0f.recipes_table
    LEFT JOIN heroku_289aeecd4cbfb0f.bookmark_table
      ON heroku_289aeecd4cbfb0f.bookmark_table.recipeID = heroku_289aeecd4cbfb0f.recipes_table.recipeID
    WHERE heroku_289aeecd4cbfb0f.recipes_table.recipeID = ${recipeID}`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #LIKES
// #LIKES/UNLIKES
app.post(`/createLikes`, (req, res) => {
  const userID = req.body.userID;
  const username = req.body.username;
  const recipeID = req.body.recipeID;

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.likes_table
    WHERE userID = ? AND recipeID = ?`,
    [userID, recipeID],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.length <= 0) {
        db.query(
          `INSERT INTO heroku_289aeecd4cbfb0f.likes_table
          (userID, username, recipeID) VALUES (?,?,?)`,
          [userID, username, recipeID],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send({ message: "liked", result });
            }
          }
        );
      } else if (result.length >= 1) {
        db.query(
          `DELETE FROM heroku_289aeecd4cbfb0f.likes_table
          WHERE userID = ? AND recipeID = ?`,
          [userID, recipeID],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send({ message: "unliked", result });
            }
          }
        );
      }
    }
  );
});

// #GETALLLIKESFORSINGLERECIPE
app.get("/getAllLikes/:recipeID", (req, res) => {
  const recipeID = req.params.recipeID;
  // console.log(recipeID);

  db.query(
    `SELECT 
	    heroku_289aeecd4cbfb0f.recipes_table.*, 
	    heroku_289aeecd4cbfb0f.likes_table.likeID, 
      heroku_289aeecd4cbfb0f.likes_table.userID, 
      heroku_289aeecd4cbfb0f.likes_table.username
    FROM heroku_289aeecd4cbfb0f.recipes_table
    LEFT JOIN heroku_289aeecd4cbfb0f.likes_table 
    ON heroku_289aeecd4cbfb0f.likes_table.recipeID = heroku_289aeecd4cbfb0f.recipes_table.recipeID
    WHERE heroku_289aeecd4cbfb0f.recipes_table.recipeID = ${recipeID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// #CREATEVIEWS/UNVIEWS
app.post("/createViews/:info", (req, res) => {
  const recipeID = req.params.info.split(",")[0];
  const userID = req.params.info.split(",")[1];
  const username = req.params.info.split(",")[2];

  // console.log(recipeID + " " + userID + " " + username);

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.views_table 
     WHERE 
      heroku_289aeecd4cbfb0f.views_table.recipeID = "${recipeID}" AND 
      heroku_289aeecd4cbfb0f.views_table.userID = "${userID}" AND
      heroku_289aeecd4cbfb0f.views_table.username = "${username}"`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        // console.log(result.length);
      } else {
        // console.log(result.length);
        db.query(
          `INSERT INTO heroku_289aeecd4cbfb0f.views_table
           (recipeID, userID, username)
           VALUES (?,?,?)`,
          [recipeID, userID, username],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});

// CHECKS FOR CONNECTION TO SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running smoothly on port ${PORT}`);
});

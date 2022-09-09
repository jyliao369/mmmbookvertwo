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
    origin: ["http://localhost:3000"],
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
    secret: "If you're gone",
    resave: false,
    saveUninitialized: true,
    proxy: true,
    name: "MyFavoriteCookie",
    cookie: {
      secure: true,
      httpOnly: false,
      expires: 60 * 60 * 1000 * 2,
      sameSite: "none",
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
});

// #LOGIN
app.post("/login", (req, res) => {
  const loginEmail = req.body.loginEmail;
  const loginPass = req.body.loginPass;
  console.log(loginEmail);

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.users_table WHERE email = ?`,
    [loginEmail],
    (err, result) => {
      if (err) {
        console.log(err);
      } else if (result.length > 0) {
        bcrypt.compare(loginPass, result[0].password, (err, response) => {
          if (response) {
            req.session.user = result;
            console.log("Identification match!! Logging in");
            res.send(result);
          } else {
            console.log("Incorrect password!! Try again");
          }
        });
      }
    }
  );
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
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

  console.log(
    userID +
      " " +
      firstName +
      " " +
      lastName +
      " " +
      username +
      " " +
      email +
      " " +
      favRecipe +
      " " +
      favBeverage +
      " " +
      favDessert +
      " " +
      favCuisine +
      " " +
      chefDesc
  );

  db.query(
    `UPDATE heroku_289aeecd4cbfb0f.users_table SET 
    firstName = "${firstName}", lastName = "${lastName}", username = "${username}", 
    email = "${email}", favRecipe = "${favRecipe}", favBeverage = "${favBeverage}", 
    favDessert = "${favDessert}", favCuisine = "${favCuisine}", chefDesc = "${chefDesc}" 
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
// #GETALLRECIPES
app.get("/getAllRecipes", (req, res) => {
  db.query(
    "SELECT * FROM heroku_289aeecd4cbfb0f.recipes_table",
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
    "SELECT * FROM heroku_289aeecd4cbfb0f.recipes_table WHERE userID = ?",
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

// GETRECIPEBYID
app.get("/getRecipe/:recipeID", (req, res) => {
  const recipeID = req.params.recipeID;

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.recipes_table WHERE recipeID = ?`,
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

// #CREATERECIPES
app.post("/createRecipe", (req, res) => {
  const userID = req.body.userID;
  const username = req.body.username;
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
    (userID, username, name, description, prepTime, cookTime,
    totalTime, category, yield, servings, course, cuisine,
    diet, ingredients, instructions, addNotes)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      userID,
      username,
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
// #FOLLOWINGandUNFOLLOWING
app.post("/followingUser/:chefUserID", (req, res) => {
  const chefUserID = req.params.chefUserID;
  const userID = req.body.userID;
  const chefUsername = req.body.chefUsername;

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.followchef_table WHERE chefUserID = ? AND userID = ? `,
    [chefUserID, userID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result.length);
      }

      if (result.length <= 0) {
        db.query(
          `INSERT INTO heroku_289aeecd4cbfb0f.followchef_table
          (userID, chefUserID, chefUsername)
          VALUES (?,?,?)`,
          [userID, chefUserID, chefUsername],
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

// CHECKS FOR CONNECTION TO SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running smoothly on port ${PORT}`);
});

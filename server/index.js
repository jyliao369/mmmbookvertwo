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

// ROUTES
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

// CHECKS FOR CONNECTION TO SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running smoothly on port ${PORT}`);
});

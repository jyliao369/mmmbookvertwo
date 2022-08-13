const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

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

  db.query(
    `SELECT * FROM heroku_289aeecd4cbfb0f.users_table WHERE email = ?`,
    [loginEmail],
    (err, result) => {
      if (err) {
        console.log(err);
      } else if (result.length > 0) {
        bcrypt.compare(loginPass, result[0].password, (err, response) => {
          if (response) {
            console.log("Identification match!! Logging in");
          } else {
            console.log("Incorrect password!! Try again");
          }
        });
      }
    }
  );
});

// CHECKS FOR CONNECTION TO SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running smoothly on port ${PORT}`);
});

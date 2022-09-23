import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Explore from "./components/Explore";
import DrinksPage from "./components/DrinksPage";
import DishesPage from "./components/DishesPage";
import UserProfile from "./components/UserProfile";
import NewRecipes from "./components/NewRecipes";
import Profile from "./components/Profile";
import Create from "./components/Create";
import RecipePage from "./components/RecipePage";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(`https://mmmbook-vertwo-server.herokuapp.com/login`, {}).then(
      (response) => {
        if (response.data.loggedIn === true) {
          // console.log(response.data);
          setIsLoggedIn(response.data.loggedIn);
          // console.log("hello");
          // console.log(response.data.user[0]);
          setCurrentUser(response.data.user[0]);
        }
      }
    );
  }, []);

  return (
    <Router>
      <div className="appCont">
        <Navbar
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
        />
        <div className="mainPage">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isLoggedIn={isLoggedIn}
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                />
              }
            />
            <Route path="/explore" element={<Explore />} />
            <Route path="/drinks" element={<DrinksPage />} />
            <Route path="/dishes" element={<DishesPage />} />
            <Route
              path="/userProfile/:userID"
              element={
                <UserProfile
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/profile/:userID"
              element={
                <Profile isLoggedIn={isLoggedIn} currentUser={currentUser} />
              }
            />
            <Route
              path="/create"
              element={<Create currentUser={currentUser} />}
            />
            <Route
              path="/recipe/:recipeID"
              element={
                <RecipePage isLoggedIn={isLoggedIn} currentUser={currentUser} />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          </Routes>
        </div>
        <NewRecipes />
      </div>
    </Router>
  );
}

export default App;

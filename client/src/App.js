import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TitleBanner from "./components/TitleBanner";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Explore from "./components/Explore";
import DrinksPage from "./components/DrinksPage";
import DishesPage from "./components/DishesPage";
import UserProfile from "./components/UserProfile";
import NewRecipes from "./components/NewRecipes";
import Profile from "./components/Profile";
import CreatePage from "./components/CreatePage";
import RecipePage from "./components/RecipePage";
import Login from "./components/Login";
import Register from "./components/Register";
import UpdatePage from "./components/UpdatePage";
import CustomizePage from "./components/CustomizePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(`https://mmmbook-vertwo-server.herokuapp.com/login`, {}).then(
      (response) => {
        console.log(response.data);

        if (response.data.isLoggedIn === true) {
          setIsLoggedIn(response.data.isLoggedIn);
          setCurrentUser(response.data.user[0]);
        }
      }
    );
  }, []);

  return (
    <Router basename="/mmmbookvertwo">
      <div className="appCont">
        <TitleBanner isLoggedIn={isLoggedIn} />
        <div className="appContTwo">
          <Navbar
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
          <div className="mainPage" id="mainPage">
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
              <Route
                path="/explore"
                element={
                  <Explore
                    isLoggedIn={isLoggedIn}
                    setCurrentUser={setCurrentUser}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/drinks"
                element={
                  <DrinksPage
                    isLoggedIn={isLoggedIn}
                    setCurrentUser={setCurrentUser}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/dishes"
                element={
                  <DishesPage
                    isLoggedIn={isLoggedIn}
                    setCurrentUser={setCurrentUser}
                    currentUser={currentUser}
                  />
                }
              />
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
                element={<CreatePage currentUser={currentUser} />}
              />
              <Route path="/update/:recipeID" element={<UpdatePage />} />
              <Route
                path="/customize/:recipeID"
                element={<CustomizePage currentUser={currentUser} />}
              />
              <Route
                path="/recipe/:recipeID"
                element={
                  <RecipePage
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                  />
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
        </div>

        {/* <NewRecipes /> */}
      </div>
    </Router>
  );
}

export default App;

import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
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
          console.log(response.data);
          setIsLoggedIn(response.data.loggedIn);
          setCurrentUser(response.data.user[0]);
        }
      }
    );
  }, []);

  return (
    <Router>
      <div className="appCont">
        <Navbar isLoggedIn={isLoggedIn} />
        <div className="mainPage">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/register"
              element={
                <Register
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

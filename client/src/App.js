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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("https://mmmbook-vertwo-server.herokuapp.com/register", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post(`https://mmmbook-vertwo-server.herokuapp.com/login`, {
      loginEmail: loginEmail,
      loginPass: loginPass,
    }).then((response) => {
      console.log(response);
    });
  };

  const logout = () => {
    Axios.get("https://mmmbook-vertwo-server.herokuapp.com/logout", {}).then(
      (response) => {
        console.log(response);
      }
    );
  };

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
        <Navbar />
        <div className="mainPage">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
    // <div className="App">
    //   <p>hello world</p>
    //   <div>
    //     <p>register</p>
    //     <input
    //       value={firstName}
    //       onChange={(e) => setFirstName(e.target.value)}
    //       placeholder="First Name"
    //     />
    //     <input
    //       value={lastName}
    //       onChange={(e) => setLastName(e.target.value)}
    //       placeholder="Last Name"
    //     />
    //     <input
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       placeholder="Username"
    //     />
    //     <input
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="Email"
    //     />
    //     <input
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //       type={"password"}
    //     />
    //     <button onClick={() => register()}>Register</button>
    //   </div>

    //   <div>
    //     <p>login</p>
    //     <input
    //       value={loginEmail}
    //       onChange={(e) => setLoginEmail(e.target.value)}
    //       placeholder="Email"
    //     />
    //     <input
    //       value={loginPass}
    //       onChange={(e) => setLoginPass(e.target.value)}
    //       placeholder="Password"
    //       type={"password"}
    //     />
    //     {isLoggedIn === false ? (
    //       <button onClick={() => login()}>Login</button>
    //     ) : (
    //       <button onClick={() => logout()}>Logout</button>
    //     )}
    //   </div>
    // </div>
  );
}

export default App;

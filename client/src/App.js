import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";

function App() {
  Axios.defaults.withCredentials = true;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/register", {
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
    Axios.post(`http://localhost:3001/login`, {
      loginEmail: loginEmail,
      loginPass: loginPass,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="App">
      <p>hello world</p>
      <div>
        <p>register</p>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type={"password"}
        />
        <button onClick={() => register()}>Register</button>
      </div>

      <div>
        <p>login</p>
        <input
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={loginPass}
          onChange={(e) => setLoginPass(e.target.value)}
          placeholder="Password"
          type={"password"}
        />
        <button onClick={() => login()}>Login</button>
      </div>
    </div>
  );
}

export default App;

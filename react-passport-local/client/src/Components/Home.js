import React, { useState } from "react";
import axios from "axios";

function Home() {


  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loginUsername, setLogUsername] = useState("");
  const [loginPassword, setLogPasswrd] = useState("");
  const [data, setData] = useState("")

  const register = () => {
    axios({
      method: "post",
      data: {
        username: regUsername,
        password: regPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/register",
    }).then((res) => console.log(res));
  };

  // Login Route
  const login = () => {
    axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    }).then((res) => console.log(res));
  };

  //getuser route
  const getUser = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/user",
    }).then((res) => setData(res.data));
  };

  return (
    <div>
      <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          onChange={(e) => setRegUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>
      <hr />

      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLogUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLogPasswrd(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>
      <hr />
      <h3>Get user</h3>
      <button onClick={getUser}>Submit</button>
      {
          data ? <h1>Welcome Back {data.username}</h1> : null
      }
    </div>
  );
}

export default Home;

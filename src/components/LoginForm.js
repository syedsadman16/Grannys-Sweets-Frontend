import React, { useState } from "react";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <label htmlFor="username">
        <b>Username</b>
      </label>
      <input
        type="text"
        placeholder="Enter Username"
        name="username"
        value={username}
        onChange={handleUsernameChange}
      />

      <label htmlFor="password">
        <b>Password</b>
      </label>
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        onClick={() => {
          console.log(username, password);
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;

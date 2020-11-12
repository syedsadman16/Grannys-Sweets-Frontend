import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("Loading...");
      await dispatch(login({ username, password }, history));
    } catch (err) {
      setError("Can't Login. Please try again.");
      document.getElementById("password-field").focus();
    }
  };

  return (
    <>
      <div className="sign-in-title">Sign-In</div>
      <div className="menu-icon-divider-container">
        <hr className="title-divider-left" />
        <FontAwesomeIcon icon={faUtensils} size="2x" color="gray" />
        <hr className="title-divider-right" />
      </div>
      <div className="form-container">
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              required
              name="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter Username"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              id="password-field"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
            />
          </Form.Group>
          <div className="signin-btn-container">
            <Button variant="success" type="submit" block>
              Sign In
            </Button>
            {error && <div>{error}</div>}
            <hr className="signin-create-divider" />
          </div>
        </Form>
        <Link to="/signup">
          <Button variant="primary" type="submit" block>
            Create Account
          </Button>
        </Link>
      </div>
    </>
  );
};

export default LoginForm;

import React from "react";
import LoginForm from "../components/LoginForm";

export default class Signin extends React.Component {
  render() {
    return (
      <h1>
        Sign in page
        <LoginForm />
      </h1>
    );
  }
}

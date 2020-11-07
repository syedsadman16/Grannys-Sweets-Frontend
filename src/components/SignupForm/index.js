import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { Button, Form } from "react-bootstrap";

import "./SignupForm.css";

const SignupForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState("");
	const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
	const history = useHistory();
	
	const handleUsernameChange = (e) => {
    setUsername(e.target.value);
	};
	
	const handlePasswordChange = (e) => {
    setPassword(e.target.value);
	};
	
	const handleAddressChange = (e) => {
    setAddress(e.target.value);
	};
	
	const handleRegisterAccount = async (e) => {
		e.preventDefault();
		//REDUX REGISTER ACOUNT CALL HERE//
		alert("Account Registered")
	}

	const handleSetUserAsCustomer = () => {
		setUserType("customer")
	}

	const handleSetUserAsChef = () => {
		setUserType("chef")
	}

  return (
    <>
      <div className="sign-in-title">Register</div>
      <div className="menu-icon-divider-container">
        <hr className="title-divider-left" />
        <FontAwesomeIcon icon={faUtensils} size="2x" color="gray" />
        <hr className="title-divider-right" />
      </div>
      <div className="form-container">
				<Form onSubmit={handleRegisterAccount}>
					<Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
							autoFocus
							required
							type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Create Username"
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
              placeholder="Create Password"
            />
          </Form.Group>
					<Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
							required
              id="address-field"
              name="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="Address"
            />
          </Form.Group>
					<fieldset>
						<Form.Group>
							<Form.Label>
								Type
							</Form.Label>
							<Form.Group>
								<Form.Check inline required
									type="radio"
									label="customer"
									name="user-type"
									id="customer"
									onChange={handleSetUserAsCustomer}
								/>
								<Form.Check inline
									type="radio"
									label="chef"
									name="user-type"
									id="chef"
									onChange={handleSetUserAsChef}
								/>
							</Form.Group>
						</Form.Group>
					</fieldset>
					<div className="register-account-btn-submit">
						<Button variant="success" type="submit" block>
							Register Account
						</Button>
					</div>
				</Form>
      </div>
			{console.log(username,address,password, userType)}
    </>
  )
}

export default SignupForm;
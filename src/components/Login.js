import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import validator from "validator";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./api";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/custom.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loggedInUser = useSelector((state) => state.login.loggedInUser);

  const sendLogout = useMutation({
    mutationFn: loginUser(),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser !== "") {
      navigate("/");
    }
    //    console.log("Loggedin user is ", loggedInUser === "");
  }, [loggedInUser, navigate]);

  const usernameHandler = (event) => {
    setUsername(event.target.value);
    event.preventDefault();
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    event.preventDefault();
  };

  const isUsernameValid = () => {
    if (validator.isAlphanumeric(username)) {
      return true;
    }
    return false;
  };

  const isPasswordValid = () => {
    if (password.length > 6) return true;
    return false;
  };

  const areLoginFieldsValid = () => {
    if (isUsernameValid() && isPasswordValid()) return true;
    return false;
  };

  const onSubmitHandler = (event) => {
    const postLoginInfo = async (loginInfo) => {
      try {
        sendLogout.mutate(loginInfo);
      } catch (error) {
        console.error(error);
      }
    };

    const onSubmit = async () => {
      if (username === "" || password === "") {
        alert("Please fill all of the fields before submitting.");
        event.preventDefault();
      } else if (areLoginFieldsValid() === false) {
        alert("Password or Username is not valid.");
        event.preventDefault();
      } else if (areLoginFieldsValid()) {
        const loginInfo = {
          username: username,
          password: password,
        };
        await postLoginInfo(loginInfo);
        setUsername("");
        setPassword("");
        event.preventDefault();
        window.location.reload();
      }
    };
    onSubmit(); //call onsubmit function which is an async function.
    event.preventDefault();
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <p className="mt-2">Industrialisasi Login. </p>
      <div className="mb-2">
        <p>Please enter your username and password. </p>
      </div>
      <Form.Group className="mb-2">
        <Form.Label>Username: </Form.Label>
        <Form.Control
          type="username"
          placeholder="username"
          onChange={usernameHandler}
          value={username}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label> Password: </Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={passwordHandler}
          value={password}
        ></Form.Control>
      </Form.Group>
      <Button type="submit">Login</Button>
    </Form>
  );
};
export default Login;

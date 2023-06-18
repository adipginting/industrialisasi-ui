import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import validator from "validator";
import Header from "./Header";
import { api, getUsername } from "../api";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/custom.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      if ((await getUsername()) !== "") {
        setLoggedInUser(await getUsername());
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setLoggedInUser("");
      }
    };
    checkIfLoggedIn();
  }, [setIsLoggedIn, setLoggedInUser]);

  useEffect(() => {
    if (isLoggedIn === true) navigate("/");
  }, [isLoggedIn, navigate]);

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
    const postLoginInfo = async (_loginInfo_) => {
      try {
        const { data } = await api.post("/login", _loginInfo_);
        localStorage.setItem("jwttoken", data);
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
        setJustLoggedIn(true);
        event.preventDefault();
      }
    };
    onSubmit(); //call onsubmit function which is an async function.
    event.preventDefault();
  };

  return (
    <Container fluid="lg">
      <Row>
        <Col md={2}></Col>
        <Col md={4}>
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
        </Col>
        <Col md></Col>
      </Row>
    </Container>
  );
};
export default Login;

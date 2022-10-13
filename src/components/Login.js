import React from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/custom.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import validator from "validator";
import { api } from "../api";
import Header from './Header';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (event) => {
    setUsername(event.target.value);
    event.preventDefault();
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    event.preventDefault();
  };

  const isUsernameValid = () => {
    if (validator.isAlphanumeric(username)){
      return true;
    }
    return false;
  };

  const isPasswordValid = () => {
    if (password.length > 6) return true;
    return false;
  };

  const onSubmitHandler = (event) => {
    const postLoginInfo = async (_loginInfo_) => {
      try {
        const { data } = await api.post("/login", _loginInfo_);
        localStorage.setItem("jwthash", data);
      } catch (error) {
        console.error(error);
      }
    };

    const onSubmit = async () => {
      if (
        username === "" ||
        password === ""
      ) {
        alert("Please fill all of the fields before submitting.");
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
      } else if (areLoginFieldsValid() === false) {
        alert("Password or Username is not valid.");
        event.preventDefault();
      }
    };

    onSubmit(); //call onsubmit function which is an async function.
  };

  const areLoginFieldsValid = () => {
    if (
      isUsernameValid() &&
      isPasswordValid()
    )
      return true;
    return false;
  };


  return (
    <Container fluid="lg">
      <Row>
        <Col md></Col>
        <Col sm md>
          <Header />
            <Form onSubmit={onSubmitHandler} >
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
        <Col sm md></Col>
      </Row>
    </Container>
  );
};
export default Login;

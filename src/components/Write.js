import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Header from './Header';
import { api, getJwt } from "../api";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/custom.css";


const Login = () => {
  const [username, setUsername] = useState("");
  const [title, setTitle ] = useState("");
  const [content, setContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      if(await getJwt() !== 'no'){
        setLoggedInUser(await getJwt());
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setLoggedInUser('no');
      }
    };
    checkIfLoggedIn();
  }, [setIsLoggedIn, setLoggedInUser]);

  useEffect(() => {
    if(isLoggedIn === false)
      navigate('/login');
  }, [isLoggedIn, navigate]);

  const titleHandler = (event) => {
    setTitle(event.target.value);
    event.preventDefault();
  };

  const areLoginFieldsValid = () => {
    if (
      isUsernameValid() &&
      isPasswordValid()
    )
      return true;
    return false;
  };

  const onSubmitHandler = (event) => {
    const postLoginInfo = async () => {
      try {
        const { data } = await api.post("/post", post);
      } catch (error) {
        console.error(error);
      }
    };

    const onSubmit = async () => {
      if (areLoginFieldsValid()) {
        const loginInfo = {
          username: username,
          password: password,
        };
        await postLoginInfo(loginInfo);
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
          <Header user={loggedInUser}/>
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
        <Col md></Col>
      </Row>
    </Container>
  );
};
export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Header from './Header';
import { api, getUsername } from "../api";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/custom.css";


const Login = () => {
  const [title, setTitle ] = useState("");
  const [content, setContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      if(await getUsername() !== ''){
        setLoggedInUser(await getUsername());
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setLoggedInUser('');
      }
    };
    checkIfLoggedIn();
  }, [setIsLoggedIn, setLoggedInUser]);

  useEffect(() => {
//    if(isLoggedIn === true)
   //   navigate('/login');
  }, [isLoggedIn, navigate]);

  const titleHandler = (event) => {
    setTitle(event.target.value);
    event.preventDefault();
  };

  const contentHandler = (event) => {
    setContent(event.target.value);
    event.preventDefault();
  };

  const onSubmitHandler = (event) => {
    const postThePost = async () => {
      try {
        const thePost = {'title':title, 'content': content};
        const { data } = await api.post("/post", thePost);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    postThePost();
    event.preventDefault();

  };

  return (
    <Container fluid="lg">
      <Row>
        <Col></Col>
        <Col md={8}>
          <Header user={loggedInUser} isWriting={true} />
          <Form onSubmit={onSubmitHandler} >
            <p className="mt-2">Write new post. </p>
            <Form.Group className="mb-2">
              <Form.Label>Post title </Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                onChange={titleHandler}
                value={title}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label> Post content: </Form.Label>
              <Form.Control
                as="textarea"
                rows={12}
                placeholder="start typing content"
                onChange={contentHandler}
                value={content}
              ></Form.Control>
            </Form.Group>
            <Button type="submit">Publish post</Button>
          </Form>
        </Col>
        <Col md></Col>
      </Row>
    </Container>
  );
};
export default Login;

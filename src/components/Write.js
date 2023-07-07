import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { api } from "../components/api";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/custom.css";
import { useSelector } from "react-redux";

const Login = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const loggedInUser = useSelector((state) => state.login.loggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser === "") {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

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
        const thePost = {
          title: title,
          content: content,
          username: loggedInUser,
        };
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
        <Col md={8}>
          <Form onSubmit={onSubmitHandler}>
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
      </Row>
    </Container>
  );
};
export default Login;

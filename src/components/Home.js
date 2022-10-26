import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import { api, getJwt } from "../api";

const Post = ({ title, author, postedAt, lastEditAt, post }) => {
  const jsDate = (pgDate) => {
    return new Date(pgDate).toLocaleDateString();
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>
        An article by {author} on {jsDate(postedAt)}{" "}
        {lastEditAt !== null && <span>{jsDate(lastEditAt)}</span>}
      </p>
      <div>{post}</div>
    </div>
  );
};

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(5);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      if ((await getJwt()) !== "no") {
        setLoggedInUser(await getJwt());
      } else {
        setLoggedInUser("no");
      }
    };
    checkIfLoggedIn();
  }, [setLoggedInUser]);

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await api.post("/posts", { no_posts: noPosts });
      setPosts(data.rows);
      console.log(data.rows);
    };

    getPosts();
  }, [noPosts]);

  return (
    <div>
      <Container fluid="lg">
        <Row>
          <Col md></Col>
          <Col md={8}>
            <Header user={loggedInUser} recentlyLoggedIn={false} />
            {posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  title={post.title}
                  author={post.username}
                  postedAt={post.posted_at}
                  lastEditAt={post.last_edited_at}
                  post={post.post}
                />
              );
            })}
          </Col>
          <Col md></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

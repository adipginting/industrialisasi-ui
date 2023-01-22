import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "./Header";
import { api, getUsername } from "../api";

const Post = ({ title, author, postedAt, lastEditAt, post }) => {
  const jsDate = (pgDate) => {
    return new Date(pgDate).toLocaleDateString();
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>
        An article by {author} on {jsDate(postedAt)}{" "}
        {lastEditAt !== null && <span>(last edit on {jsDate(lastEditAt)})</span>}
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
      if ((await getUsername()) !== "no") {
        setLoggedInUser(await getUsername());
      } else {
        setLoggedInUser("no");
      }
    };
    checkIfLoggedIn();
  }, [setLoggedInUser]);

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await api.post("/posts", { no_posts: noPosts });
      if(typeof(data.rows) === 'undefined')
        setPosts([]);
      else
        setPosts(data.rows);
    };

    getPosts();
  }, [noPosts]);

  const morePosts = (event) => {
    setNoPosts(noPosts + 5);
    event.preventDefault();
  };

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
                  key={post.PostId}
                  title={post.Title}
                  author={post.Username}
                  postedAt={post.PostedAt}
                  lastEditAt={post.LastEditedAt}
                  post={post.Post}
                />
              );
            })}
          {
            ( posts.length >= noPosts) &&
            <Button onClick={morePosts} className="mt-4">Load more posts </Button>
          }
          </Col>
          <Col md></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { retrieveXNumberOfPosts } from "./api";

const Post = ({ title, author, postedAt, lastEditAt, content }) => {
  const jsDate = (pgDate) => {
    return new Date(pgDate).toLocaleDateString();
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>
        An article by {author} on {jsDate(postedAt)}{" "}
        {lastEditAt !== null && (
          <span>(last edit on {jsDate(lastEditAt)})</span>
        )}
      </p>
      <div>{content}</div>
    </div>
  );
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(5);
  const retrievePosts = useMutation({
    mutationFn: retrieveXNumberOfPosts,
  });

  useEffect(() => {
    const retrievePostsAsync = async () => {
      const data = await retrievePosts.mutateAsync(noPosts);
      setPosts(data);
    };
    retrievePostsAsync();
  }, [noPosts, setPosts]);

  const morePosts = (event) => {
    setNoPosts(noPosts + 5);
    event.preventDefault();
  };

  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={post.PostId}
            title={post.Title}
            author={post.Username}
            postedAt={post.PostedAt}
            lastEditAt={post.LastEditedAt}
            content={post.content}
          />
        );
      })}
      {posts.length >= noPosts && (
        <Button onClick={morePosts} className="mt-4">
          Load more posts{" "}
        </Button>
      )}
    </>
  );
};

export default Home;

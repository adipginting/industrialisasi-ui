import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { retrieveXNumberOfPosts } from "./api";

const Post = ({ title, author, postedAt, lastEditAt, content }) => {
  const jsDate = (pgDate) => {
    return new Date(pgDate).toLocaleDateString();
  };

  const contentArray = content.split("\n");

  return (
    <div>
      <h2>{title}</h2>
      <p>
        An article by {author} on {jsDate(postedAt)}{" "}
        {lastEditAt !== null && (
          <span>(last edit on {jsDate(lastEditAt)})</span>
        )}
      </p>
      <div>
        {contentArray.map((paragraph) => {
          if (paragraph != "") {
            return <p>{paragraph}</p>;
          }
        })}
      </div>
    </div>
  );
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(5);

  // eslint-disable-next-line
  const retrievePosts = useCallback(
    useMutation({
      mutationFn: retrieveXNumberOfPosts,
    }),
    []
  );

  useEffect(() => {
    const retrievePostsAsync = async () => {
      const data = await retrievePosts.mutateAsync(noPosts);
      console.log(data);
      setPosts(data);
    };
    retrievePostsAsync();
  }, [noPosts, setPosts, retrievePosts]);

  const morePosts = (event) => {
    setNoPosts(noPosts + 5);
    event.preventDefault();
  };

  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={post.postid}
            title={post.title}
            author={post.username}
            postedAt={post.postedat}
            lastEditAt={post.lasteditedat}
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

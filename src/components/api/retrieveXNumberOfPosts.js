import api from "./api";

const retrieveXNumberOfPosts = async (no_posts) => {
  const { data } = await api.post("/posts", { no_posts: no_posts });
  return data.rows;
};

export default retrieveXNumberOfPosts;

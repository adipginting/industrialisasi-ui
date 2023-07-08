import api from "./api";

const retrieveSomeNumberOfPosts = async (no_posts) => {
  const { data } = await api.post("/posts", { no_posts: no_posts });
  return data.rows;
};

export default retrieveSomeNumberOfPosts;

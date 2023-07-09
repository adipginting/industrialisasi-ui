import api from "./api";

const getUsername = async () => {
  const response = await api.get("/can-user-post");
  return response;
};

export default getUsername;

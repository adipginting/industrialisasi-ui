import api from "./api";

const checkUsername = async (username) => {
  const response = await api.post("/username", { username: username });
  return response.data;
};

export default checkUsername;

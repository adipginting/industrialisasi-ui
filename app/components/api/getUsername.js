import api from "./api";

const getUsername = async () => {
  const response = await api.get("/welcome");
  if (response.data.username === "") {
    console.log(response.data.message);
  }
  return response.data.username;
};

export default getUsername;

import api from "./api";

const checkEmail = async (email) => {
  const response = await api.post("/email", { email: email });
  return response.data;
};

export default checkEmail;

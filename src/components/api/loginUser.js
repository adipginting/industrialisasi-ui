import api from "./api";

const loginUser = async (loginInfo) => {
  const res = await api.post("/login", loginInfo);
  return res;
};

export default loginUser;

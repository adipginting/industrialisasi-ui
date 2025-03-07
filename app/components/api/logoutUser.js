import api from "./api";

const logoutUser = async () => {
    await api.post("/logout");
};

export default logoutUser;

import api from "./api";

const logoutUser = async () => {
    const response = await api.post("/logout");
    return response.data;
};

export default logoutUser;

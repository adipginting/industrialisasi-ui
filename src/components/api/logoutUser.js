import api from "./api";
import getUsername from "./getUsername";

const logoutUser = async () => {
    const username = await getUsername();
    const response = await api.post("/", { username });
    console.log(response.data);
    return response.data;
};

export default logoutUser;

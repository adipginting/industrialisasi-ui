import api from './api';

const getJwt = async () => {
    const response =  await api.get("/jwtvalidation");
    if (response.data === 'no'){
      return response.data;
    } else {
      return response.data;
    }
  }

export default getJwt;

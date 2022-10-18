import axios from 'axios';

const auth = () => {
  if (localStorage.getItem("jwttoken") === null)
    return 'no token';
  else if (typeof(localStorage.getItem("jwttoken")) === 'undefined')
    return 'undefined';
  else if (localStorage.getItem("jwttoken") === 'loggedout')
    return 'loggedout';
  else
    return "Bearer " + localStorage.getItem("jwttoken");
};

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': auth(),
  }
}, console.log(auth()));

export default api;


